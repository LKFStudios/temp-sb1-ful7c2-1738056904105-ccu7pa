import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface PrivacyScreenProps {
  onClose: () => void;
}

export function PrivacyScreen({ onClose }: PrivacyScreenProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">プライバシーポリシー</h1>
        <div className="w-6" />
      </div>

      <div className="px-6 py-8 space-y-6">
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <p className="text-gray-600 text-sm mb-2">
            プライバシーポリシーの詳細は以下のURLでもご確認いただけます：
          </p>
          <a 
            href="https://lkfstudios.com/policies/privacy-policy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-700 break-all flex items-start gap-2"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0 mt-1" />
            https://lkfstudios.com/policies/privacy-policy
          </a>
        </div>

        <section>
          <h2 className="text-lg font-bold mb-4">1. 収集する情報</h2>
          <p className="text-gray-600 leading-relaxed">
            本サービスでは、以下の情報を収集します：
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600">
            <li>顔写真データ</li>
            <li>デバイス情報（OS、ブラウザの種類など）</li>
            <li>利用履歴</li>
            <li>アプリケーションの使用状況</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">2. 情報の利用目的</h2>
          <p className="text-gray-600 leading-relaxed">
            収集した情報は、以下の目的で利用されます：
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600">
            <li>顔分析サービスの提供</li>
            <li>サービスの改善と新機能の開発</li>
            <li>カスタマーサポートの提供</li>
            <li>利用統計の作成</li>
            <li>パーソナライズされたコンテンツの提供</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">3. 情報の保護</h2>
          <p className="text-gray-600 leading-relaxed">
            当社は、収集した情報を適切な安全管理措置を講じて保護します。
            以下の対策を実施しています：
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600">
            <li>データの暗号化</li>
            <li>アクセス制御の実施</li>
            <li>定期的なセキュリティ監査</li>
            <li>従業員への教育・研修</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">4. データの保持期間</h2>
          <p className="text-gray-600 leading-relaxed">
            アップロードされた写真は分析後直ちに削除されます。
            その他の情報は、以下の期間保持されます：
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600">
            <li>アカウント情報：退会後6ヶ月間</li>
            <li>利用履歴：最終利用から2年間</li>
            <li>分析結果：ユーザーが明示的に削除するまで</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">5. ユーザーの権利</h2>
          <p className="text-gray-600 leading-relaxed">
            ユーザーには以下の権利が保障されています：
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600">
            <li>個人情報の開示請求</li>
            <li>個人情報の訂正・削除</li>
            <li>個人情報の利用停止</li>
            <li>個人情報の第三者提供の停止</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">6. お問い合わせ</h2>
          <p className="text-gray-600 leading-relaxed">
            プライバシーポリシーに関するお問い合わせは、以下の窓口までご連絡ください：
          </p>
          <div className="mt-4">
            <a 
              href="https://lkfstudios.com/policies/privacy-policy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              詳細なプライバシーポリシー
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}