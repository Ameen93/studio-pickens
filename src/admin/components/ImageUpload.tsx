import React, { useState } from 'react';
import ImageSelector from './ImageSelector';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (imagePath: string) => void;
  placeholder?: string;
  previewClassName?: string;
  required?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  value,
  onChange,
  placeholder = "Select an image...",
  previewClassName = "w-32 h-20",
  required = false
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDirectUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        onChange(result.path);
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleImageSelect = (imagePath: string) => {
    onChange(imagePath);
    setIsModalOpen(false);
  };

  const handleRemoveImage = () => {
    onChange('');
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {/* Image Preview */}
      {value && (
        <div className="mb-4 relative inline-block">
          <img
            src={value}
            alt="Preview"
            className={`${previewClassName} object-cover rounded border shadow-sm`}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
            title="Remove image"
          >
            ×
          </button>
        </div>
      )}

      {/* Upload Options */}
      <div className="space-y-3">
        {/* Quick Upload */}
        <div>
          <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 inline-block">
            {uploading ? 'Uploading...' : 'Upload New Image'}
            <input
              type="file"
              accept="image/*"
              onChange={handleDirectUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {/* Browse Existing */}
        <div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Browse Existing Images
          </button>
        </div>

        {/* Manual Path Input (for advanced users) */}
        <div>
          <details className="mt-2">
            <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
              Advanced: Enter image path manually
            </summary>
            <div className="mt-2">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder={placeholder}
              />
            </div>
          </details>
        </div>
      </div>

      {/* Current Value Display */}
      {value && (
        <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
          <strong>Current:</strong> {value}
        </div>
      )}

      {/* Image Selector Modal */}
      <ImageSelector
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleImageSelect}
        title={`Select ${label}`}
        selectedImage={value}
      />
    </div>
  );
};

export default ImageUpload;