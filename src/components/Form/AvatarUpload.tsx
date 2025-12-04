import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cropImageToCircle } from '../../utils/imageProcessor';

interface AvatarUploadProps {
  currentAvatar: string | null;
  onChange: (avatar: string | null) => void;
}

export default function AvatarUpload({ currentAvatar, onChange }: AvatarUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setIsProcessing(true);

    try {
      const croppedImage = await cropImageToCircle(file);
      onChange(croppedImage);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1,
    maxSize: 5242880
  });

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Avatar
      </label>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-honey-500 bg-honey-50'
            : 'border-honey-300 hover:border-honey-400'
        }`}
      >
        <input {...getInputProps()} />

        {isProcessing ? (
          <p className="text-gray-600">Processing image...</p>
        ) : currentAvatar ? (
          <div className="space-y-3">
            <div className="flex justify-center">
              <img
                src={currentAvatar}
                alt="Avatar preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-honey-300"
              />
            </div>
            <p className="text-sm text-gray-600">
              Click or drag to replace
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-5xl">🐝</div>
            <p className="text-gray-600">
              {isDragActive
                ? 'Drop your image here'
                : 'Drag and drop an image, or click to select'}
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG or WEBP (max 5MB)
            </p>
          </div>
        )}
      </div>

      {currentAvatar && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onChange(null);
          }}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Remove avatar
        </button>
      )}
    </div>
  );
}
