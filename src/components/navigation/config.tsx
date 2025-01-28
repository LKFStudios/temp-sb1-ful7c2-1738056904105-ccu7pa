import React from 'react';
import { Scan, CheckCircle, MessageCircle, Settings } from 'lucide-react';
import { Gender } from '../../types';
import { NavigationItem } from './types';
import { NAVIGATION_SCREENS, NAVIGATION_LABELS } from './constants';

export function getNavigationItems(gender: Gender): NavigationItem[] {
  const labels = gender === 'female' ? NAVIGATION_LABELS.FEMALE : NAVIGATION_LABELS.MALE;
  
  return [
    {
      id: NAVIGATION_SCREENS.SCAN,
      icon: <Scan className="w-5 h-5" />,
      label: labels[NAVIGATION_SCREENS.SCAN]
    },
    {
      id: NAVIGATION_SCREENS.DAILY,
      icon: <CheckCircle className="w-5 h-5" />,
      label: labels[NAVIGATION_SCREENS.DAILY]
    },
    {
      id: NAVIGATION_SCREENS.COACH,
      icon: <MessageCircle className="w-5 h-5" />,
      label: labels[NAVIGATION_SCREENS.COACH]
    },
    {
      id: NAVIGATION_SCREENS.SETTINGS,
      icon: <Settings className="w-5 h-5" />,
      label: labels[NAVIGATION_SCREENS.SETTINGS]
    }
  ];
}