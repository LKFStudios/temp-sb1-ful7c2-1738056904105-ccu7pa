import React, { useState } from 'react';
import { Share2, Copy, CheckCircle } from 'lucide-react';
import { generateReferralUrl } from '../utils/referral';

interface ReferralCardProps {
  referralId: string;
  onShare?: () => void;
}

export function ReferralCard({ referralId, onShare }: ReferralCardProps) {
  const [copied, setCopied] = useState(false);
  const referralUrl = generateReferralUrl(referralId);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ビジュマックスに招待',
          text: '一緒にビジュマックスで魅力を高めませんか？',
          url: referralUrl
        });
        onShare?.();
      } catch (error) {
        console.error('Failed to share:', error);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">招待コード</h3>
        <button
          onClick={handleShare}
          className="text-green-600 hover:text-green-700 p-2 rounded-full hover:bg-green-50 transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
        <code className="font-mono text-lg font-medium">{referralId}</code>
        <button
          onClick={handleCopy}
          className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-white transition-colors"
        >
          {copied ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        このコードを友達に共有すると、特典が受け取れます
      </p>
    </div>
  );
}