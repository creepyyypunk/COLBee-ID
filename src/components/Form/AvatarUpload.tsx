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
      <label className="block text-sm font-medium text-bee-black tracking-tight">
        Add your PFP here
      </label>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragActive
            ? 'border-bee-black bg-honey-100/50 scale-[1.02]'
            : 'border-honey-300 hover:border-honey-400 hover:bg-honey-50/30'
        }`}
      >
        <input {...getInputProps()} />

        {isProcessing ? (
          <p className="text-honey-600">Processing image...</p>
        ) : currentAvatar ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <img
                src={currentAvatar}
                alt="Avatar preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-honey-200 shadow-md"
              />
            </div>
            <p className="text-sm text-honey-600 font-light">
              Click or drag to replace
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-center">
              <img src="/images/avatar_bee.webp" alt="Bee" className="w-16 h-16 opacity-80" />
            </div>
            <p className="text-bee-black font-medium">
              {isDragActive
                ? 'Drop your image here'
                : 'Drag and drop an image, or click to select'}
            </p>
            <p className="text-xs text-honey-600 font-light">
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
          className="text-sm text-accent-danger hover:text-accent-danger/80 transition-colors font-medium"
        >
          Remove avatar
        </button>
      )}
    </div>
  );
}
