import React, { useState, useEffect } from 'react';
import { HeroData } from '../types';
import LivePreviewPanel from './LivePreview';
import ImageUpload from './ImageUpload';
import { apiGet, apiPut } from '../utils/api';

const HeroEditor = () => {
  const [heroData, setHeroData] = useState<HeroData>({
    title: "STUDIO PICKENS",
    subtitle: "",
    atelierTitle: "ATELIER WIGS BY ROBERT PICKENS",
    atelierDescription: "Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus. Amet sed risus lacinia sed. Quis ultricies vestibulum eleifend dignissim auctor laoreet feugiat.",
    banner: {
      logoSize: { scale: 1, unit: "rem" },
      titleSize: { scale: 1, unit: "rem" }
    },
    backgroundImages: [],
    polaroids: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [previewRefresh, setPreviewRefresh] = useState(0);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const data = await apiGet('/hero');
      if (data && typeof data === 'object') {
        // Ensure arrays exist with fallbacks
        setHeroData({
          ...data,
          backgroundImages: data.backgroundImages || [],
          polaroids: data.polaroids || [],
          banner: data.banner || {
            logoSize: { scale: 1, unit: "rem" },
            titleSize: { scale: 1, unit: "rem" }
          }
        });
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiPut(`/hero/${heroData.id || 1}`, heroData);
      
      setMessage('Hero section updated successfully!');
      setPreviewRefresh(Date.now()); // Trigger preview refresh
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving hero data:', error);
      setMessage('Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof HeroData, value: string) => {
    setHeroData(prev => ({ ...prev, [field]: value }));
  };

  const handlePolaroidChange = (index: number, field: string, value: string | number) => {
    setHeroData(prev => {
      const polaroids = [...prev.polaroids];
      if (polaroids[index]) {
        polaroids[index] = { ...polaroids[index], [field]: value };
      }
      return { ...prev, polaroids };
    });
  };

  const handleBackgroundImageChange = (index: number, field: string, value: string) => {
    setHeroData(prev => {
      const backgroundImages = [...prev.backgroundImages];
      if (backgroundImages[index]) {
        backgroundImages[index] = { ...backgroundImages[index], [field]: value };
      }
      return { ...prev, backgroundImages };
    });
  };

  const handleBackgroundImageTransformChange = (index: number, field: string, value: number | boolean) => {
    setHeroData(prev => {
      const backgroundImages = [...prev.backgroundImages];
      if (backgroundImages[index]) {
        backgroundImages[index] = {
          ...backgroundImages[index],
          transform: {
            scale: 1,
            translateX: 0,
            translateY: 0,
            flip: false,
            ...backgroundImages[index].transform,
            [field]: value
          }
        };
      }
      return { ...prev, backgroundImages };
    });
  };

  const handleBannerChange = (sizeType: 'logoSize' | 'titleSize', value: number) => {
    setHeroData(prev => ({
      ...prev,
      banner: {
        logoSize: prev.banner?.logoSize || { scale: 1, unit: "rem" },
        titleSize: prev.banner?.titleSize || { scale: 1, unit: "rem" },
        ...prev.banner,
        [sizeType]: { scale: value, unit: "rem" }
      }
    }));
  };

  if (loading) {
    return <div className="p-8">Loading hero data...</div>;
  }

  return (
    <div className="flex h-full">
      {/* Left Column - Editor */}
      <div className="w-1/2 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Hero Section Editor</h2>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}

        <div className="space-y-6">
        {/* Banner Section */}
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Banner Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Title
              </label>
              <input
                type="text"
                value={heroData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-3"
                placeholder="STUDIO PICKENS"
              />
              
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title Size Scale: {heroData.banner?.titleSize?.scale || 1}x
              </label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={heroData.banner?.titleSize?.scale || 1}
                onChange={(e) => handleBannerChange('titleSize', parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.5x</span>
                <span>1.5x</span>
                <span>3x</span>
              </div>
            </div>

            {/* Logo Size Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo Size Scale: {heroData.banner?.logoSize?.scale || 1}x
              </label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={heroData.banner?.logoSize?.scale || 1}
                onChange={(e) => handleBannerChange('logoSize', parseFloat(e.target.value))}
                className="w-full mb-3"
              />
              <div className="flex justify-between text-xs text-gray-500 mb-4">
                <span>0.5x</span>
                <span>1.5x</span>
                <span>3x</span>
              </div>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle (Optional)
              </label>
              <input
                type="text"
                value={heroData.subtitle}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Add a subtitle..."
              />
            </div>
          </div>
        </div>

        {/* Atelier Text Section */}
        <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Atelier Section Text</h3>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Atelier Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Atelier Title
              </label>
              <input
                type="text"
                value={heroData.atelierTitle || ''}
                onChange={(e) => handleInputChange('atelierTitle', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="ATELIER WIGS BY ROBERT PICKENS"
              />
            </div>
            
            {/* Atelier Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Atelier Description
              </label>
              <textarea
                value={heroData.atelierDescription || ''}
                onChange={(e) => handleInputChange('atelierDescription', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus. Amet sed risus lacinia sed. Quis ultricies vestibulum eleifend dignissim auctor laoreet feugiat."
              />
            </div>
          </div>
        </div>

        {/* Background Images */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Background Images</h3>
          {heroData.backgroundImages?.map((bg, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Image {index + 1}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <ImageUpload
                    label="Background Image"
                    value={bg.image || ''}
                    onChange={(path) => handleBackgroundImageChange(index, 'image', path)}
                    placeholder="/images/hero/background1.jpg"
                    previewClassName="w-32 h-20"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={bg.alt || ''}
                    onChange={(e) => handleBackgroundImageChange(index, 'alt', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    placeholder="Image description"
                  />
                </div>
              </div>
              
              {/* Transform Controls */}
              <div className="mt-4 border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Image Transform</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Scale: {bg.transform?.scale || 1}x
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={bg.transform?.scale || 1}
                      onChange={(e) => handleBackgroundImageTransformChange(index, 'scale', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Flip Image
                    </label>
                    <input
                      type="checkbox"
                      checked={bg.transform?.flip || false}
                      onChange={(e) => handleBackgroundImageTransformChange(index, 'flip', e.target.checked)}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Translate X: {bg.transform?.translateX || 0}px
                    </label>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      step="1"
                      value={bg.transform?.translateX || 0}
                      onChange={(e) => handleBackgroundImageTransformChange(index, 'translateX', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Translate Y: {bg.transform?.translateY || 0}px
                    </label>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      step="1"
                      value={bg.transform?.translateY || 0}
                      onChange={(e) => handleBackgroundImageTransformChange(index, 'translateY', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Polaroids Management */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Polaroid Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {heroData.polaroids?.map((polaroid, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-3">Polaroid {index + 1}</h4>
                
                {/* Polaroid Preview */}
                <div className="mb-4">
                  <div 
                    className="w-24 h-32 mx-auto bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-md"
                    style={{
                      transform: `rotate(${polaroid.rotation || 0}deg)`,
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    {polaroid.image ? (
                      <img
                        src={polaroid.image}
                        alt={polaroid.alt}
                        className="w-full h-24 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-24 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                        No Image
                      </div>
                    )}
                    <div className="h-8 bg-white flex items-center justify-center text-xs text-gray-400">
                      Polaroid Frame
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="mb-3">
                  <ImageUpload
                    label="Polaroid Image"
                    value={polaroid.image || ''}
                    onChange={(path) => handlePolaroidChange(index, 'image', path)}
                    placeholder="/images/polaroids/new-polaroid-1.png"
                    previewClassName="w-16 h-20"
                  />
                </div>

                {/* Alt Text */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={polaroid.alt || ''}
                    onChange={(e) => handlePolaroidChange(index, 'alt', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Behind the scenes"
                  />
                </div>

                {/* Rotation */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Rotation (degrees): {polaroid.rotation || 0}°
                  </label>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    step="0.1"
                    value={polaroid.rotation || 0}
                    onChange={(e) => handlePolaroidChange(index, 'rotation', parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <input
                    type="number"
                    min="-45"
                    max="45"
                    step="0.1"
                    value={polaroid.rotation || 0}
                    onChange={(e) => handlePolaroidChange(index, 'rotation', parseFloat(e.target.value))}
                    className="w-full mt-1 p-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Position Info */}
                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  <strong>Position:</strong> {index === 0 ? 'Top Left' : index === 1 ? 'Bottom Center' : 'Bottom Right'}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Use the slider or input field to adjust rotation. 
              Position is automatically set based on the polaroid number for optimal layout.
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* Right Column - Live Preview */}
      <div className="w-1/2 border-l border-gray-300 bg-gray-50 overflow-y-auto">
        <div className="p-6">
          <LivePreviewPanel refreshTrigger={previewRefresh} />
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;