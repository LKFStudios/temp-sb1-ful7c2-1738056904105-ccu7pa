import React from 'react';
import { Navigation } from '../navigation/Navigation';

interface AppLayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function AppLayout({ children, showNavigation, currentScreen, onNavigate }: AppLayoutProps) {
  return (
    <div className="relative min-h-screen bg-white">
      <div className={`${showNavigation ? 'pb-[calc(4rem+env(safe-area-inset-bottom))]' : ''}`}>
        {children}
      </div>
      {showNavigation && (
        <Navigation 
          currentScreen={currentScreen} 
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}