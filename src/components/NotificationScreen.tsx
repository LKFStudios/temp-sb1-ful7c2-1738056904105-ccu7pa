import React, { useState } from 'react';
import { Bell, AlertCircle } from 'lucide-react';
import { Button } from './common/Button';
import { analytics } from '../services/analytics';

interface NotificationScreenProps {
  onContinue: () => void;
}

export function NotificationScreen({ onContinue }: NotificationScreenProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkNotificationSupport = (): boolean => {
    if (!('Notification' in window)) {
      setError('このブラウザは通知をサポートしていません');
      return false;
    }
    return true;
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Permission request failed:', error);
      return false;
    }
  };

  const sendTestNotification = () => {
    try {
      const notification = new Notification('ビジュマックスへようこそ！', {
        body: '通知が正常に設定されました',
        icon: '/vite.svg',
        tag: 'welcome-notification',
        requireInteraction: false
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      notification.onshow = () => {
        setTimeout(() => notification.close(), 5000);
      };
    } catch (error) {
      console.error('Test notification failed:', error);
    }
  };

  const handleEnableNotifications = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // ブラウザのサポートチェック
      if (!checkNotificationSupport()) {
        analytics.track('Notifications Not Supported');
        onContinue();
        return;
      }

      // 既に許可されている場合
      if (Notification.permission === 'granted') {
        analytics.track('Notifications Already Enabled');
        sendTestNotification();
        onContinue();
        return;
      }

      // 既に拒否されている場合
      if (Notification.permission === 'denied') {
        setError('ブラウザの設定から通知を許可してください');
        analytics.track('Notifications Previously Denied');
        return;
      }

      // 通知の許可を要求
      const granted = await requestNotificationPermission();
      
      if (granted) {
        analytics.track('Notifications Enabled');
        sendTestNotification();
        onContinue();
      } else {
        analytics.track('Notifications Denied');
        setError('通知を有効にできませんでした');
      }
    } catch (error) {
      console.error('Notification setup failed:', error);
      setError('通知の設定中にエラーが発生しました');
      analytics.trackError(error instanceof Error ? error : new Error('Notification setup failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    analytics.track('Notifications Skipped');
    onContinue();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-md flex gap-2 mb-12">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-1 flex-1 rounded-full ${
                step === 2 ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <h1 className="text-3xl font-bold mb-12 text-center font-gothic">
          通知を有効にする
        </h1>

        <div className="w-48 h-48 bg-gray-100 rounded-full mb-12 flex items-center justify-center">
          <Bell className="w-24 h-24 text-yellow-400" />
        </div>

        <p className="text-gray-600 text-center mb-12 max-w-md">
          最新の情報やアップデートをお届けするために通知を有効にしてください
        </p>

        {error && (
          <div className="w-full max-w-md bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="w-full max-w-md space-y-4">
          <Button
            onClick={handleEnableNotifications}
            isLoading={isLoading}
            className="w-full"
            size="lg"
          >
            通知を有効にする
          </Button>

          <Button
            onClick={handleSkip}
            variant="secondary"
            className="w-full"
            size="lg"
          >
            スキップ
          </Button>
        </div>
      </div>
    </div>
  );
}