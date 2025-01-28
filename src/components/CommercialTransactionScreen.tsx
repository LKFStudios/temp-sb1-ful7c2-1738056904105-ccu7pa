import React from 'react';
import { X } from 'lucide-react';

interface CommercialTransactionScreenProps {
  onClose: () => void;
}

export function CommercialTransactionScreen({ onClose }: CommercialTransactionScreenProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">特定商取引法に基づく表示</h1>
        <div className="w-6" />
      </div>

      <div className="px-6 py-8 space-y-8">
        <section>
          <h2 className="text-lg font-bold mb-4">販売事業者</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-gray-600">事業者名</dt>
              <dd className="mt-1">LKF Studios株式会社</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">代表者</dt>
              <dd className="mt-1">代表取締役 山田太郎</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">所在地</dt>
              <dd className="mt-1">〒150-0002 東京都渋谷区渋谷2-1-1</dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">サービス内容</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-gray-600">サービス名</dt>
              <dd className="mt-1">イケメン工場 プレミアムプラン</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">価格</dt>
              <dd className="mt-1">週額600円（税込）</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">支払方法</dt>
              <dd className="mt-1">App Store / Google Play 決済</dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">契約について</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-gray-600">契約期間</dt>
              <dd className="mt-1">1週間（自動更新）</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">解約・返品について</dt>
              <dd className="mt-1">
                契約期間中のキャンセル・返金はできません。
                次回更新を停止する場合は、更新日の24時間前までに解約手続きを行ってください。
              </dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">お問い合わせ</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-gray-600">連絡先</dt>
              <dd className="mt-1">support@lkfstudios.com</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">受付時間</dt>
              <dd className="mt-1">平日10:00〜18:00（土日祝日・年末年始を除く）</dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">その他</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-gray-600">動作環境</dt>
              <dd className="mt-1">
                iOS 14.0以降、Android 8.0以降
                <br />
                インターネット接続が必要です
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">販売数量</dt>
              <dd className="mt-1">制限なし</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">提供時期</dt>
              <dd className="mt-1">お支払い完了後、即時利用可能</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}