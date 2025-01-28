import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { validateImage, convertToBase64, compressImage } from '../utils/imageProcessing';
import { Camera, Upload, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (imageData: string) => void;
  isLoading: boolean;
}

export function ImageUploader({ onImageUpload, isLoading }: ImageUploaderProps) {
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    try {
      setError(null);

      // Validate image
      const validationResult = await validateImage(file);
      if (!validationResult.isValid) {
        setError(validationResult.error || '画像の検証に失敗しました');
        return;
      }

      // Convert to base64
      const base64 = await convertToBase64(file);

      // Compress image
      const compressed = await compressImage(base64);

      // Pass to parent
      onImageUpload(compressed);
    } catch (err) {
      setError('画像の処理中にエラーが発生しました');
      console.error('Image processing error:', err);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      await handleFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    disabled: isLoading
  });

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
          isDragActive
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 hover:border-green-500'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-500" />
            </div>
          </div>

          <div>
            <p className="text-lg font-medium">
              {isDragActive ? 'ここにドロップ' : '写真をアップロード'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              または、クリックして写真を選択
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          // Open camera on mobile devices
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.capture = 'user';
          input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              await handleFile(file);
            }
          };
          input.click();
        }}
        disabled={isLoading}
        className="w-full bg-gray-100 text-gray-900 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Camera className="w-5 h-5" />
        カメラで撮影
      </button>
    </div>
  );
}