import { ReactNode } from 'react';

export interface NavigationItem {
  id: string;
  icon: ReactNode;
  label: string;
}

export interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export interface NavigationItemProps extends NavigationItem {
  isActive: boolean;
  onClick: () => void;
}