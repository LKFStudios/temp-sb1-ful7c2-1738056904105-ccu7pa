import React from 'react';

interface NavigationBarProps {
  children: React.ReactNode;
}

export function NavigationBar({ children }: NavigationBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <nav className="bg-white/95 backdrop-blur-lg border-t border-gray-200">
        <div className="max-w-md mx-auto px-2">
          <div className="flex justify-around items-center py-2 pb-safe">
            {children}
          </div>
        </div>
      </nav>
    </div>
  );
}