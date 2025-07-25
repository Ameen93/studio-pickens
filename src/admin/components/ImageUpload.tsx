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
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      await performUpload(formData, file);
    } catch (error) {
      console.error('Critical upload error:', error);
      alert('Upload failed due to an unexpected error. Please try again.');
      setUploading(false);
    } finally {
      // Reset the file input to allow re-selection of the same file
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const performUpload = async (formData: FormData, file: File) => {
    try {
      const token = localStorage.getItem('studio-pickens-auth-token');
      
      if (!token) {
        alert('Authentication required. Please log in again.');
        setUploading(false);
        return;
      }
      
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const uploadUrl = `${apiUrl}/api/upload`;
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        onChange(result.data.path);
        alert('Upload successful!');
      } else {
        const errorText = await response.text();
        
        let errorObj;
        try {
          errorObj = JSON.parse(errorText);
        } catch (e) {
          errorObj = { error: errorText };
        }
        alert(`Upload failed (${response.status}): ${errorObj.error || errorObj.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        alert('Upload failed: Cannot connect to server. Please check if the server is running.');
      } else if (error instanceof Error && error.name === 'AbortError') {
        alert('Upload failed: Request was cancelled.');
      } else if (error instanceof Error) {
        alert(`Upload failed: ${error.message || 'Please try again.'}`);
      } else {
        alert('Upload failed: An unexpected error occurred. Please try again.');
      }
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
          
          <button
            type="button"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => {
                const event = e as any;
                handleDirectUpload(event);
              };
              input.click();
            }}
            disabled={uploading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload New Image'}
          </button>
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