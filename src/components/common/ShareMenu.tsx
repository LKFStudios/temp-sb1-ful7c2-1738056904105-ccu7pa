import React from 'react';
import { X, Twitter, Instagram, Share2, Copy, Check } from 'lucide-react';

interface ShareMenuProps {
  title: string;
  text: string;
  url: string;
  onClose: () => void;
  onShare: (platform: string) => void;
}

export function ShareMenu({ title, text, url, onClose, onShare }: ShareMenuProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (error) {
      console.error('Failed to copy:', error);
      return false;
    }
  };

  const shareButtons = [
    {
      id: 'instagram',
      label: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      onClick: () => onShare('instagram')
    },
    {
      id: 'line',
      label: 'LINE',
      icon: '💬',
      onClick: () => onShare('line')
    },
    {
      id: 'twitter',
      label: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      onClick: () => onShare('twitter')
    },
    {
      id: 'copy',
      label: 'コピー',
      icon: copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />,
      onClick: async () => {
        const success = await handleCopyToClipboard(`${text}\n${url}`);
        if (success) {
          onShare('copy');
        }
      }
    }
  ];

  // Only add native share button if the API is available
  if (navigator.share) {
    shareButtons.push({
      id: 'other',
      label: 'その他',
      icon: <Share2 className="w-5 h-5" />,
      onClick: () => onShare('native')
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end animate-fade-in">
      <div className="bg-white w-full rounded-t-3xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <button 
            onClick={onClose}
            className="p-2 -m-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
          <h3 className="text-lg font-medium">共有</h3>
          <div className="w-6" />
        </div>
        
        <div className="p-6 grid grid-cols-4 gap-4">
          {shareButtons.map((button) => (
            <button
              key={button.id}
              onClick={button.onClick}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-12 h-12 rounded-full ${copied && button.id === 'copy' ? 'bg-green-100' : 'bg-gray-100'} flex items-center justify-center text-xl transition-colors`}>
                {typeof button.icon === 'string' ? button.icon : button.icon}
              </div>
              <span className="text-sm text-gray-700">{button.label}</span>
            </button>
          ))}
        </div>

        <div className="px-6 pb-8">
          <button
            onClick={onClose}
            className="w-full py-3 text-gray-500 font-medium"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
}