import React, { useState, useEffect } from 'react';
import { StoryData, StoryCircle, StoryItem } from '../types';
import LivePreviewPanel from './LivePreview';
import ImageUpload from './ImageUpload';

const StoryEditor = () => {
  const [storyData, setStoryData] = useState<StoryData>({
    id: 1,
    circles: [],
    createdAt: '',
    updatedAt: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [previewRefresh, setPreviewRefresh] = useState(0);
  const [expandedCircle, setExpandedCircle] = useState<number | null>(null);

  useEffect(() => {
    fetchStoryData();
  }, []);

  const fetchStoryData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/story');
      if (!response.ok) {
        throw new Error('Failed to fetch story data');
      }
      const data = await response.json();
      setStoryData(data);
    } catch (error) {
      console.error('Error fetching story data:', error);
      setMessage('Error fetching story data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`http://localhost:3001/api/story/${storyData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyData),
      });
      
      if (response.ok) {
        setMessage('Story page updated successfully!');
        setPreviewRefresh(Date.now());
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || 'Failed to save'}`);
      }
    } catch (error) {
      console.error('Error saving story data:', error);
      setMessage('Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  const handleCircleChange = (circleId: number, field: keyof StoryCircle, value: any) => {
    setStoryData(prev => ({
      ...prev,
      circles: prev.circles.map(circle =>
        circle.id === circleId ? { ...circle, [field]: value } : circle
      )
    }));
  };

  const handleItemChange = (circleId: number, itemId: number, field: keyof StoryItem, value: any) => {
    setStoryData(prev => ({
      ...prev,
      circles: prev.circles.map(circle =>
        circle.id === circleId ? {
          ...circle,
          items: circle.items.map(item =>
            item.id === itemId ? { ...item, [field]: value } : item
          )
        } : circle
      )
    }));
  };

  const handleItemContentChange = (circleId: number, itemId: number, contentField: string, value: any) => {
    setStoryData(prev => ({
      ...prev,
      circles: prev.circles.map(circle =>
        circle.id === circleId ? {
          ...circle,
          items: circle.items.map(item =>
            item.id === itemId ? {
              ...item,
              content: {
                ...item.content,
                [contentField]: value
              }
            } : item
          )
        } : circle
      )
    }));
  };

  const handleItemPositionChange = (circleId: number, itemId: number, device: 'desktop' | 'mobile', positionField: string, value: string) => {
    setStoryData(prev => ({
      ...prev,
      circles: prev.circles.map(circle =>
        circle.id === circleId ? {
          ...circle,
          items: circle.items.map(item =>
            item.id === itemId ? {
              ...item,
              position: {
                ...item.position,
                [device]: {
                  ...item.position[device],
                  [positionField]: value
                }
              }
            } : item
          )
        } : circle
      )
    }));
  };

  const handleItemRotationChange = (circleId: number, itemId: number, device: 'desktop' | 'mobile', rotation: number) => {
    setStoryData(prev => ({
      ...prev,
      circles: prev.circles.map(circle =>
        circle.id === circleId ? {
          ...circle,
          items: circle.items.map(item =>
            item.id === itemId ? {
              ...item,
              rotation: {
                desktop: 0,
                mobile: 0,
                ...item.rotation,
                [device]: rotation
              }
            } : item
          )
        } : circle
      )
    }));
  };

  const addNewItem = (circleId: number, type: 'polaroid' | 'text' | 'button') => {
    const newItem: StoryItem = {
      id: Date.now(),
      type,
      content: type === 'polaroid' 
        ? { image: '', alt: '', year: '' }
        : type === 'text'
        ? { text: '', font: 'font-lovtony' }
        : { text: 'Button', action: '' },
      position: {
        desktop: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
        mobile: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
      },
      rotation: type === 'text' ? { desktop: 0, mobile: 0 } : undefined,
      fontSize: { desktop: 'clamp(40px, 8vw, 135px)', mobile: '61px' },
      visibility: { desktop: true, mobile: true }
    };

    setStoryData(prev => ({
      ...prev,
      circles: prev.circles.map(circle =>
        circle.id === circleId ? {
          ...circle,
          items: [...circle.items, newItem]
        } : circle
      )
    }));
  };

  const removeItem = (circleId: number, itemId: number) => {
    if (!window.confirm('Are you sure you want to remove this item?')) {
      return;
    }

    setStoryData(prev => ({
      ...prev,
      circles: prev.circles.map(circle =>
        circle.id === circleId ? {
          ...circle,
          items: circle.items.filter(item => item.id !== itemId)
        } : circle
      )
    }));
  };

  if (loading) {
    return <div className="p-8">Loading story data...</div>;
  }

  return (
    <div className="flex h-full">
      {/* Left Column - Editor */}
      <div className="w-1/2 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Story Page Editor</h2>
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
          {storyData.circles.map((circle) => (
            <div key={circle.id} className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{circle.name}</h3>
                <button
                  onClick={() => setExpandedCircle(expandedCircle === circle.id ? null : circle.id)}
                  className="text-purple-600 hover:text-purple-800 text-sm"
                >
                  {expandedCircle === circle.id ? 'Collapse' : 'Expand'}
                </button>
              </div>

              {expandedCircle === circle.id && (
                <div className="space-y-4">
                  {/* Circle Content */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Circle Title
                      </label>
                      <input
                        type="text"
                        value={circle.content.title}
                        onChange={(e) => handleCircleChange(circle.id, 'content', {
                          ...circle.content,
                          title: e.target.value
                        })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Circle Type
                      </label>
                      <select
                        value={circle.type}
                        onChange={(e) => handleCircleChange(circle.id, 'type', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="simple">Simple Border</option>
                        <option value="dashed_rotating">Dashed Rotating</option>
                        <option value="mixed">Mixed (Mobile Dashed)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Circle Description
                    </label>
                    <textarea
                      value={circle.content.description}
                      onChange={(e) => handleCircleChange(circle.id, 'content', {
                        ...circle.content,
                        description: e.target.value
                      })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      rows={3}
                    />
                  </div>

                  {/* Items */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-md font-medium text-gray-700">Circle Items ({circle.items.length})</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => addNewItem(circle.id, 'polaroid')}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          + Polaroid
                        </button>
                        <button
                          onClick={() => addNewItem(circle.id, 'text')}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          + Text
                        </button>
                        <button
                          onClick={() => addNewItem(circle.id, 'button')}
                          className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700"
                        >
                          + Button
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {circle.items.map((item) => (
                        <div key={item.id} className="p-4 bg-white border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <h5 className="font-medium text-gray-800 capitalize">{item.type} Item</h5>
                            <button
                              onClick={() => removeItem(circle.id, item.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>

                          {/* Item Content */}
                          {item.type === 'polaroid' && (
                            <div className="grid grid-cols-3 gap-3 mb-3">
                              <ImageUpload
                                label="Polaroid Image"
                                value={item.content.image || ''}
                                onChange={(path) => handleItemContentChange(circle.id, item.id, 'image', path)}
                                placeholder="/images/polaroids/polaroid.JPG"
                                previewClassName="w-20 h-20"
                              />
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Alt Text</label>
                                <input
                                  type="text"
                                  value={item.content.alt || ''}
                                  onChange={(e) => handleItemContentChange(circle.id, item.id, 'alt', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Year</label>
                                <input
                                  type="text"
                                  value={item.content.year || ''}
                                  onChange={(e) => handleItemContentChange(circle.id, item.id, 'year', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500"
                                />
                              </div>
                            </div>
                          )}

                          {item.type === 'text' && (
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Text Content</label>
                                <textarea
                                  value={item.content.text || ''}
                                  onChange={(e) => handleItemContentChange(circle.id, item.id, 'text', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500"
                                  rows={2}
                                  placeholder="Enter text (use \\n for line breaks)"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Font Class</label>
                                <select
                                  value={item.content.font || 'font-lovtony'}
                                  onChange={(e) => handleItemContentChange(circle.id, item.id, 'font', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500"
                                >
                                  <option value="font-lovtony">Lovtony Script</option>
                                  <option value="font-proxima">Proxima Nova</option>
                                  <option value="font-proxima-wide">Proxima Nova Wide</option>
                                </select>
                              </div>
                            </div>
                          )}

                          {item.type === 'button' && (
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Button Text</label>
                                <input
                                  type="text"
                                  value={item.content.text || ''}
                                  onChange={(e) => handleItemContentChange(circle.id, item.id, 'text', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Action/Link</label>
                                <input
                                  type="text"
                                  value={item.content.action || ''}
                                  onChange={(e) => handleItemContentChange(circle.id, item.id, 'action', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500"
                                  placeholder="/contact"
                                />
                              </div>
                            </div>
                          )}

                          {/* Position Controls */}
                          <div className="border-t pt-3">
                            <h6 className="text-sm font-medium text-gray-600 mb-3">Position & Rotation</h6>
                            
                            {/* Desktop Position */}
                            <div className="mb-3">
                              <label className="block text-xs font-medium text-gray-600 mb-2">Desktop Position</label>
                              <div className="grid grid-cols-4 gap-2">
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Top</label>
                                  <input
                                    type="text"
                                    value={item.position.desktop.top || ''}
                                    onChange={(e) => handleItemPositionChange(circle.id, item.id, 'desktop', 'top', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-purple-500"
                                    placeholder="50%"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Left</label>
                                  <input
                                    type="text"
                                    value={item.position.desktop.left || ''}
                                    onChange={(e) => handleItemPositionChange(circle.id, item.id, 'desktop', 'left', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-purple-500"
                                    placeholder="50%"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Bottom</label>
                                  <input
                                    type="text"
                                    value={item.position.desktop.bottom || ''}
                                    onChange={(e) => handleItemPositionChange(circle.id, item.id, 'desktop', 'bottom', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-purple-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Right</label>
                                  <input
                                    type="text"
                                    value={item.position.desktop.right || ''}
                                    onChange={(e) => handleItemPositionChange(circle.id, item.id, 'desktop', 'right', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-purple-500"
                                  />
                                </div>
                              </div>
                              <div className="mt-2">
                                <label className="block text-xs text-gray-500 mb-1">Transform</label>
                                <input
                                  type="text"
                                  value={item.position.desktop.transform || ''}
                                  onChange={(e) => handleItemPositionChange(circle.id, item.id, 'desktop', 'transform', e.target.value)}
                                  className="w-full p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-purple-500"
                                  placeholder="translate(-50%, -50%)"
                                />
                              </div>
                            </div>

                            {/* Mobile Position */}
                            <div className="mb-3">
                              <label className="block text-xs font-medium text-gray-600 mb-2">Mobile Position</label>
                              <div className="grid grid-cols-4 gap-2">
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Top</label>
                                  <input
                                    type="text"
                                    value={item.position.mobile.top || ''}
                                    onChange={(e) => handleItemPositionChange(circle.id, item.id, 'mobile', 'top', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-purple-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Left</label>
                                  <input
                                    type="text"
                                    value={item.position.mobile.left || ''}
                                    onChange={(e) => handleItemPositionChange(circle.id, item.id, 'mobile', 'left', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-purple-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Bottom</label>
                                  <input
                                    type="text"
                                    value={item.position.mobile.bottom || ''}
                                    onChange={(e) => handleItemPositionChange(circle.id, item.id, 'mobile', 'bottom', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-purple-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">Right</label>
                                  <input
                                    type="text"
                                    value={item.position.mobile.right || ''}
                                    onChange={(e) => handleItemPositionChange(circle.id, item.id, 'mobile', 'right', e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-purple-500"
                                  />
                                </div>
                              </div>
                              <div className="mt-2">
                                <label className="block text-xs text-gray-500 mb-1">Transform</label>
                                <input
                                  type="text"
                                  value={item.position.mobile.transform || ''}
                                  onChange={(e) => handleItemPositionChange(circle.id, item.id, 'mobile', 'transform', e.target.value)}
                                  className="w-full p-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-purple-500"
                                />
                              </div>
                            </div>

                            {/* Rotation Controls for Text */}
                            {item.type === 'text' && item.rotation && (
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Desktop Rotation: {item.rotation.desktop}°
                                  </label>
                                  <input
                                    type="range"
                                    min="-45"
                                    max="45"
                                    step="0.1"
                                    value={item.rotation.desktop}
                                    onChange={(e) => handleItemRotationChange(circle.id, item.id, 'desktop', parseFloat(e.target.value))}
                                    className="w-full"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Mobile Rotation: {item.rotation.mobile}°
                                  </label>
                                  <input
                                    type="range"
                                    min="-45"
                                    max="45"
                                    step="0.1"
                                    value={item.rotation.mobile}
                                    onChange={(e) => handleItemRotationChange(circle.id, item.id, 'mobile', parseFloat(e.target.value))}
                                    className="w-full"
                                  />
                                </div>
                              </div>
                            )}

                            {/* Visibility Controls */}
                            <div className="mt-3 grid grid-cols-2 gap-3">
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={item.visibility.desktop}
                                  onChange={(e) => handleItemChange(circle.id, item.id, 'visibility', {
                                    ...item.visibility,
                                    desktop: e.target.checked
                                  })}
                                  className="mr-2"
                                />
                                <span className="text-xs text-gray-600">Show on Desktop</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={item.visibility.mobile}
                                  onChange={(e) => handleItemChange(circle.id, item.id, 'visibility', {
                                    ...item.visibility,
                                    mobile: e.target.checked
                                  })}
                                  className="mr-2"
                                />
                                <span className="text-xs text-gray-600">Show on Mobile</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Live Preview */}
      <div className="w-1/2 border-l border-gray-300 bg-gray-50 overflow-y-auto">
        <div className="p-6">
          <LivePreviewPanel 
            baseUrl="http://localhost:3000/story" 
            refreshTrigger={previewRefresh} 
          />
        </div>
      </div>
    </div>
  );
};

export default StoryEditor;