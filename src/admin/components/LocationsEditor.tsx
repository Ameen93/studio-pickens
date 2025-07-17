import React, { useState, useEffect } from 'react';
import { LocationsData, Location } from '../types';
import LivePreviewPanel from './LivePreview';
import ImageUpload from './ImageUpload';
import { apiGet, apiPut } from '../utils/api';

const LocationsEditor = () => {
  const [locationsData, setLocationsData] = useState<LocationsData>({
    id: 1,
    banner: {
      title: "Locations",
      animationSettings: {
        animationDelay: 1500,
        transitionDuration: 800,
        circleCount: 6
      }
    },
    locations: [],
    createdAt: "",
    updatedAt: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [previewRefresh, setPreviewRefresh] = useState(0);

  useEffect(() => {
    fetchLocationsData();
  }, []);

  const fetchLocationsData = async () => {
    try {
      const data = await apiGet('/locations');
      setLocationsData(data);
    } catch (error) {
      console.error('Error fetching locations data:', error);
      setMessage('Error fetching locations data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiPut(`/locations/${locationsData.id}`, locationsData);
      
      setMessage('Locations page updated successfully!');
      setPreviewRefresh(Date.now());
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving locations data:', error);
      setMessage('Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  const handleBannerChange = (field: keyof LocationsData['banner'], value: any) => {
    setLocationsData(prev => ({
      ...prev,
      banner: {
        ...prev.banner,
        [field]: value
      }
    }));
  };

  const handleAnimationSettingChange = (field: keyof LocationsData['banner']['animationSettings'], value: number) => {
    setLocationsData(prev => ({
      ...prev,
      banner: {
        ...prev.banner,
        animationSettings: {
          ...prev.banner.animationSettings,
          [field]: value
        }
      }
    }));
  };

  const handleLocationChange = (locationId: number, field: keyof Location, value: any) => {
    setLocationsData(prev => ({
      ...prev,
      locations: prev.locations.map(location =>
        location.id === locationId ? { ...location, [field]: value } : location
      )
    }));
  };

  const addNewLocation = () => {
    const newLocation: Location = {
      id: Date.now(),
      name: 'New Location',
      address: 'Street Address\nCity, State ZIP\nCountry',
      image: '',
      imageAlt: 'New Location Studio',
      mapsUrl: '',
      variant: 'left',
      order: locationsData.locations.length + 1,
      visible: true
    };

    setLocationsData(prev => ({
      ...prev,
      locations: [...prev.locations, newLocation]
    }));
  };

  const removeLocation = (locationId: number) => {
    if (!window.confirm('Are you sure you want to remove this location?')) {
      return;
    }

    setLocationsData(prev => ({
      ...prev,
      locations: prev.locations.filter(location => location.id !== locationId)
    }));
  };

  const moveLocation = (locationId: number, direction: 'up' | 'down') => {
    const locations = [...locationsData.locations].sort((a, b) => a.order - b.order);
    const currentIndex = locations.findIndex(location => location.id === locationId);
    
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= locations.length) return;
    
    // Swap the orders
    const temp = locations[currentIndex].order;
    locations[currentIndex].order = locations[newIndex].order;
    locations[newIndex].order = temp;
    
    setLocationsData(prev => ({
      ...prev,
      locations: locations
    }));
  };

  if (loading) {
    return <div className="p-8">Loading locations data...</div>;
  }

  return (
    <div className="flex h-full">
      {/* Left Column - Editor */}
      <div className="w-1/2 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Locations Page Editor</h2>
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

        <div className="space-y-8">
          {/* Banner Settings */}
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Banner Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Title
                </label>
                <input
                  type="text"
                  value={locationsData.banner.title}
                  onChange={(e) => handleBannerChange('title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Locations"
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Animation Settings</h4>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Animation Delay: {locationsData.banner.animationSettings.animationDelay}ms
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      step="100"
                      value={locationsData.banner.animationSettings.animationDelay}
                      onChange={(e) => handleAnimationSettingChange('animationDelay', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Transition Duration: {locationsData.banner.animationSettings.transitionDuration}ms
                    </label>
                    <input
                      type="range"
                      min="200"
                      max="2000"
                      step="100"
                      value={locationsData.banner.animationSettings.transitionDuration}
                      onChange={(e) => handleAnimationSettingChange('transitionDuration', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Circle Count: {locationsData.banner.animationSettings.circleCount}
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="10"
                      step="2"
                      value={locationsData.banner.animationSettings.circleCount}
                      onChange={(e) => handleAnimationSettingChange('circleCount', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Locations Management */}
          <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Locations ({locationsData.locations.length})</h3>
              <button
                onClick={addNewLocation}
                className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
              >
                + Add Location
              </button>
            </div>

            <div className="space-y-6">
              {locationsData.locations.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No locations found. Add your first location above.</p>
              ) : (
                locationsData.locations
                  .sort((a, b) => a.order - b.order)
                  .map((location) => (
                    <div key={location.id} className="p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <h5 className="font-medium text-gray-800">{location.name}</h5>
                          <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">Visible:</label>
                            <input
                              type="checkbox"
                              checked={location.visible}
                              onChange={(e) => handleLocationChange(location.id, 'visible', e.target.checked)}
                              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                            />
                            {location.visible ? (
                              <span className="text-xs text-green-600 font-medium">SHOWN</span>
                            ) : (
                              <span className="text-xs text-red-600 font-medium">HIDDEN</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => moveLocation(location.id, 'up')}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                            disabled={location.order === 1}
                          >
                            ↑ Up
                          </button>
                          <button
                            onClick={() => moveLocation(location.id, 'down')}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                            disabled={location.order === locationsData.locations.length}
                          >
                            ↓ Down
                          </button>
                          <button
                            onClick={() => removeLocation(location.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Location Name
                          </label>
                          <input
                            type="text"
                            value={location.name}
                            onChange={(e) => handleLocationChange(location.id, 'name', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Layout Variant
                          </label>
                          <select
                            value={location.variant}
                            onChange={(e) => handleLocationChange(location.id, 'variant', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                          >
                            <option value="left">Info Left, Image Right</option>
                            <option value="right">Image Left, Info Right</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address (use line breaks for formatting)
                        </label>
                        <textarea
                          value={location.address}
                          onChange={(e) => handleLocationChange(location.id, 'address', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                          rows={4}
                          placeholder="Street Address&#10;City, State ZIP&#10;Country"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <ImageUpload
                            label="Location Image"
                            value={location.image}
                            onChange={(path) => handleLocationChange(location.id, 'image', path)}
                            placeholder="/images/locations/location.png"
                            previewClassName="w-32 h-20"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image Alt Text
                          </label>
                          <input
                            type="text"
                            value={location.imageAlt}
                            onChange={(e) => handleLocationChange(location.id, 'imageAlt', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                            placeholder="Location Studio"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Google Maps URL
                        </label>
                        <input
                          type="url"
                          value={location.mapsUrl}
                          onChange={(e) => handleLocationChange(location.id, 'mapsUrl', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                          placeholder="https://maps.google.com/?q=..."
                        />
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Preview Info */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Preview Information</h4>
            <p className="text-sm text-gray-600">
              The locations page features an animated banner with expanding circles and location cards with hover effects. 
              You can add, remove, and reorder locations using the controls above.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Live Preview */}
      <div className="w-1/2 border-l border-gray-300 bg-gray-50 overflow-y-auto">
        <div className="p-6">
          <LivePreviewPanel 
            baseUrl="http://localhost:3000/locations" 
            refreshTrigger={previewRefresh} 
          />
        </div>
      </div>
    </div>
  );
};

export default LocationsEditor;