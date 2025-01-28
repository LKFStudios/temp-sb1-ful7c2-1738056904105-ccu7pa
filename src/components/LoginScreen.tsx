import React, { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { signInWithApple, signInWithEmail } from '../services/auth';
import { validateEmail, validatePassword } from '../utils/auth';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError('有効なメールアドレスを入力してください');
      return;
    }

    if (!validatePassword(password)) {
      setError('パスワードは6文字以上にしてください');
      return;
    }

    setIsLoading(true);

    try {
      await signInWithEmail(email, password);
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : '認証に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await signInWithApple();
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Appleログインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    onLogin();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ビジュ<span className="text-green-500">マックス</span>
            </h1>
            <p className="text-gray-600">
              あなたの魅力を最大限に引き出す
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="example@email.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                パスワード
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="6文字以上"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? '処理中...' : isSignUp ? 'アカウントを作成' : 'ログイン'}
            </button>

            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full text-sm text-gray-600 hover:text-gray-900"
            >
              {isSignUp ? 'アカウントをお持ちの方はこちら' : 'アカウントを新規作成'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">または</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAppleSignIn}
              disabled={isLoading}
              className="w-full bg-black text-white py-4 rounded-full text-lg font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center gap-3"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.52-3.2 0-.83.38-1.71.89-3.1.41C3.93 19.75 3.13 14.89 3.13 14.89c0-3.28 2.1-4.84 3.93-4.9.98-.03 1.93.65 2.54.65.61 0 1.77-.8 2.98-.68 1.96.18 3.06 1.44 3.06 1.44s-1.73 1.02-1.73 3.08c0 2.46 2.14 3.3 2.14 3.3-.19.52-.45 1.04-.79 1.5zM14.72 7.63c-.83-1.01-.73-2.32-.73-2.32s1.31.14 2.14 1.15c.83 1.01.73 2.32.73 2.32s-1.31-.14-2.14-1.15z"/>
              </svg>
              Appleでログイン
            </button>

            <button
              type="button"
              onClick={handleSkip}
              className="w-full bg-gray-50 text-gray-700 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              スキップしてはじめる
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}