import { Scan, CheckCircle, MessageCircle, Settings } from 'lucide-react';
import { Gender } from '../../types';

export function getNavigationItems(gender: Gender) {
  return gender === 'female' ? [
    { 
      id: 'scan',
      icon: <Scan className="w-5 h-5" />, 
      label: "診断"
    },
    { 
      id: 'daily',
      icon: <CheckCircle className="w-5 h-5" />, 
      label: "顔写真"
    },
    { 
      id: 'coach',
      icon: <MessageCircle className="w-5 h-5" />, 
      label: "カウンセラー"
    },
    { 
      id: 'settings',
      icon: <Settings className="w-5 h-5" />, 
      label: "設定"
    }
  ] : [
    { 
      id: 'scan',
      icon: <Scan className="w-5 h-5" />, 
      label: "スキャン"
    },
    { 
      id: 'daily',
      icon: <CheckCircle className="w-5 h-5" />, 
      label: "デイリー"
    },
    { 
      id: 'coach',
      icon: <MessageCircle className="w-5 h-5" />, 
      label: "コーチ"
    },
    { 
      id: 'settings',
      icon: <Settings className="w-5 h-5" />, 
      label: "設定"
    }
  ];
}