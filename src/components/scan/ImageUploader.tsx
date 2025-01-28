import React from 'react';
import { Camera, Upload } from 'lucide-react';
import { useImageUpload } from '../../hooks/useImageUpload';
import { ErrorMessage } from '../common/ErrorMessage';

interface ImageUploaderProps {
  onImageSelect: (imageData: string) => void;
  isLoading?: boolean;
}

export function ImageUploader({ onImageSelect, isLoading }: ImageUploaderProps) {
  const { uploadImage, error, clearError } = useImageUpload();

  const handleFileSelect = async (file: File) => {
    const imageData = await uploadImage(file);
    if (imageData) {
      onImageSelect(imageData);
    }
  };

  const handleCameraCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'user';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-4">
      {error && (
        <ErrorMessage message={error} onClose={clearError} />
      )}

      <label className="block relative border-2 border-dashed rounded-2xl p-8 text-center transition-colors hover:border-green-500 cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFileSelect(file);
            }
          }}
          className="hidden"
          disabled={isLoading}
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-500 dark:text-gray-400" />
            </div>
          </div>

          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              写真をアップロード
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              または、クリックして写真を選択
            </p>
          </div>
        </div>
      </label>

      <button
        onClick={handleCameraCapture}
        disabled={isLoading}
        className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Camera className="w-5 h-5" />
        カメラで撮影
      </button>
    </div>
  );
}