import React from 'react';
import { Gender } from '../../types';

interface BackgroundImageProps {
  gender: Gender;
  children: React.ReactNode;
}

export function BackgroundImage({ gender, children }: BackgroundImageProps) {
  const backgroundImage = gender === 'female' 
    ? "url('https://i.pinimg.com/474x/95/ee/cf/95eecf44584f477179a7996b4c4d7e03.jpg')"
    : "url('https://i.pinimg.com/736x/38/ce/ff/38ceff90ae37385e28370136fe636b6d.jpg')";

  return (
    <div 
      className="relative rounded-3xl overflow-hidden aspect-[3/4] bg-cover bg-center mb-6"
      style={{ backgroundImage }}
    >
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
        {children}
      </div>
    </div>
  );
}