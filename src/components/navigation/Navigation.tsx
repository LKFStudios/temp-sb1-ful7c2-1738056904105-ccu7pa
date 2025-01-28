import React from 'react';
import { useGender } from '../../context/GenderContext';
import { getNavigationItems } from './config';
import { NavigationItem } from './NavigationItem';
import { NavigationProps } from './types';

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const { gender } = useGender();
  const navItems = getNavigationItems(gender);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <nav className="bg-white/95 backdrop-blur-lg border-t border-gray-200">
        <div className="max-w-md mx-auto px-2">
          <div className="flex justify-around items-center py-2 pb-safe">
            {navItems.map((item) => (
              <NavigationItem
                key={item.id}
                {...item}
                isActive={currentScreen === item.id}
                onClick={() => onNavigate(item.id)}
              />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}