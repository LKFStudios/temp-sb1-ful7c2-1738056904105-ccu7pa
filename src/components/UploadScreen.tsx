import React from 'react';
import { Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface UploadScreenProps {
  onDrop: (acceptedFiles: File[]) => void;
}

export function UploadScreen({ onDrop }: UploadScreenProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black z-10" />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('https://i.pinimg.com/originals/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg')`
        }}
      />
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div 
            {...getRootProps()} 
            className="border-2 border-dashed border-gray-600 rounded-lg p-8 cursor-pointer hover:border-green-500 transition-colors bg-black/50 backdrop-blur-sm"
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto mb-4 text-green-500" size={48} />
            <p className="text-green-500 font-medium mb-2">あなたの姿を見せてください</p>
            <p className="text-gray-400">正面向きの写真をアップロードしてください</p>
          </div>
        </div>
      </div>
    </div>
  );
}