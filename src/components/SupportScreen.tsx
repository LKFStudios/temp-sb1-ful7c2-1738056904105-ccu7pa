import React, { useState } from 'react';
import { X, Mail, AlertTriangle, ChevronRight } from 'lucide-react';

interface SupportScreenProps {
  onClose: () => void;
}

export function SupportScreen({ onClose }: SupportScreenProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteAccount = () => {
    // Implement account deletion logic here
    console.log('Account deletion requested');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">サポート・お問い合わせ</h1>
        <div className="w-6" />
      </div>

      <div className="px-6 py-8 space-y-6">
        <div className="space-y-4">
          <button
            onClick={() => window.location.href = 'mailto:support@bijumax.com'}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">メールでのお問い合わせ</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <div className="h-px bg-gray-200 my-6" />

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full text-left p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-500 text-sm">アカウントを削除</span>
            </button>
          ) : (
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <h3 className="font-medium text-red-900">
                    アカウントを削除しますか？
                  </h3>
                </div>
                <p className="text-sm text-red-700 mb-4">
                  この操作は取り消すことができません。すべてのデータが完全に削除されます。
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                  >
                    削除する
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}