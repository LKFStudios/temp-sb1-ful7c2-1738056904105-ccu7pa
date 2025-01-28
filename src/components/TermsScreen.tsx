import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface TermsScreenProps {
  onClose: () => void;
}

export function TermsScreen({ onClose }: TermsScreenProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">利用規約</h1>
        <div className="w-6" />
      </div>

      <div className="px-6 py-8 space-y-6">
        <section>
          <h2 className="text-lg font-bold mb-4">1. サービスの利用について</h2>
          <p className="text-gray-600 leading-relaxed">
            本サービスは、AIを活用して顔写真を分析し、魅力度を数値化・可視化するアプリケーションです。
            利用者は以下の条件に同意の上でサービスを利用するものとします：
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600">
            <li>13歳以上であること</li>
            <li>正確な情報を提供すること</li>
            <li>自身の写真のみを使用すること</li>
            <li>他者の権利を侵害しないこと</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">2. プレミアム会員について</h2>
          <p className="text-gray-600 leading-relaxed">
            プレミアム会員は以下の特典を利用できます：
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600">
            <li>詳細な分析結果の閲覧</li>
            <li>パーソナライズされたアドバイス</li>
            <li>履歴の保存と比較</li>
            <li>広告の非表示</li>
          </ul>
          <p className="text-gray-600 mt-4">
            料金：週額600円（税込）
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">3. 禁止事項</h2>
          <p className="text-gray-600 leading-relaxed">
            以下の行為は禁止されています：
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600">
            <li>他者の写真の無断使用</li>
            <li>サービスの不正利用</li>
            <li>システムへの不正アクセス</li>
            <li>他のユーザーへの迷惑行為</li>
            <li>営利目的での利用</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">4. 知的財産権</h2>
          <p className="text-gray-600 leading-relaxed">
            本サービスに関する知的財産権は、以下の通り保護されています：
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600">
            <li>アプリケーションの著作権</li>
            <li>分析アルゴリズムの特許権</li>
            <li>サービスマークおよび商標</li>
            <li>ユーザーが生成したコンテンツの権利</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">5. 免責事項</h2>
          <p className="text-gray-600 leading-relaxed">
            以下の事項について、当社は責任を負いません：
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600">
            <li>分析結果の正確性</li>
            <li>サービスの中断・停止</li>
            <li>ユーザー間のトラブル</li>
            <li>第三者による情報の不正利用</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">6. 規約の変更</h2>
          <p className="text-gray-600 leading-relaxed">
            本規約は、必要に応じて変更される場合があります：
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600">
            <li>変更の際は事前に通知</li>
            <li>重要な変更の場合は同意を取得</li>
            <li>最新の規約が適用</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">7. お問い合わせ</h2>
          <p className="text-gray-600 leading-relaxed">
            利用規約に関するお問い合わせは、以下のリンクからご確認ください：
          </p>
          <div className="mt-4">
            <a 
              href="https://lkfstudios.com/policies/terms-of-service" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              詳細な利用規約
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}