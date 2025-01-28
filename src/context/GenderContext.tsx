import React, { createContext, useContext, useState } from 'react';

type Gender = 'male' | 'female' | 'unspecified';

interface GenderContextType {
  gender: Gender;
  setGender: (gender: Gender) => void;
}

const GenderContext = createContext<GenderContextType | undefined>(undefined);

export function GenderProvider({ children }: { children: React.ReactNode }) {
  const [gender, setGender] = useState<Gender>('unspecified');

  return (
    <GenderContext.Provider value={{ gender, setGender }}>
      {children}
    </GenderContext.Provider>
  );
}

export function useGender() {
  const context = useContext(GenderContext);
  if (context === undefined) {
    throw new Error('useGender must be used within a GenderProvider');
  }
  return context;
}