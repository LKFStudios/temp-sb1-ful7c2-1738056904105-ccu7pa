import React, { useState } from 'react';
import { Loader2, Camera, Upload } from 'lucide-react';
import { useGender } from '../context/GenderContext';

interface ScanScreenProps {
  onImageUpload: (imageData: string) => void;
  isLoading: boolean;
  analysisProgress: {
    stage: string;
    progress: number;
  };
}

export function ScanScreen({ onImageUpload, isLoading, analysisProgress }: ScanScreenProps) {
  const [error, setError] = useState<string | null>(null);
  const { gender } = useGender();

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            onImageUpload(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleCameraCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'user';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            onImageUpload(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const backgroundImage = gender === 'female' 
    ? "url('https://i.pinimg.com/474x/95/ee/cf/95eecf44584f477179a7996b4c4d7e03.jpg')"
    : "url('https://i.pinimg.com/736x/38/ce/ff/38ceff90ae37385e28370136fe636b6d.jpg')";

  const getTitle = () => {
    if (gender === 'female') {
      return 'あなたの魅力を引き出しましょう';
    }
    return 'あなたの魅力を最大化しよう';
  };

  const getButtonText = () => {
    if (gender === 'female') {
      return {
        upload: '写真を選択',
        camera: 'カメラで撮影'
      };
    }
    return {
      upload: '写真をアップロード',
      camera: 'カメラで撮影'
    };
  };

  const buttonText = getButtonText();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-4 py-4 pb-24">
        <div 
          className="relative rounded-3xl overflow-hidden aspect-[3/4] bg-cover bg-center mb-6"
          style={{ backgroundImage }}
        >
          <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center absolute inset-0 bg-black/70">
                <Loader2 className="w-12 h-12 text-green-500 animate-spin mb-4" />
                <div className="text-white text-xl font-bold mb-2">
                  {analysisProgress.stage === '特徴分析' ? '分析中' : analysisProgress.stage}
                </div>
                <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-300 ease-out"
                    style={{ width: `${analysisProgress.progress}%` }}
                  />
                </div>
                <div className="text-white/80 mt-2">{Math.round(analysisProgress.progress)}%</div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white mb-4 text-center">
                  {getTitle()}
                </h2>
                <div className="space-y-3">
                  <button
                    onClick={handleFileUpload}
                    disabled={isLoading}
                    className="w-full bg-green-500 text-white py-4 rounded-full text-xl font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    {buttonText.upload}
                  </button>
                  <button
                    onClick={handleCameraCapture}
                    disabled={isLoading}
                    className="w-full bg-white/90 backdrop-blur-sm text-gray-900 py-4 rounded-full text-xl font-semibold hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    {buttonText.camera}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}