import React, { useState, useEffect } from 'react';
import { FAQData, FAQItem } from '../types';
import LivePreviewPanel from './LivePreview';
import ImageSelector from './ImageSelector';
import { apiGet, apiPut, checkAuthToken } from '../utils/api';

const FAQEditor = () => {
  const [faqData, setFaqData] = useState<FAQData>({
    id: 1,
    banner: {
      backgroundImage: {
        desktop: "faq/4963b601-8788-4697-b9fc-5a0ce4c4e5b4.jpeg",
        mobile: "faq/4963b601-8788-4697-b9fc-5a0ce4c4e5b4.jpeg"
      },
      height: "705px",
      objectPosition: "50% 50%",
      transform: {
        scale: 1,
        translateX: 0,
        translateY: 0
      }
    },
    items: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [previewRefresh, setPreviewRefresh] = useState(0);
  const [activeTab, setActiveTab] = useState<'banner' | 'items'>('banner');
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [imageSelectMode, setImageSelectMode] = useState<'desktop' | 'mobile'>('desktop');
  const [newFAQ, setNewFAQ] = useState({
    question: '',
    answer: ''
  });
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);

  useEffect(() => {
    if (checkAuthToken()) {
      fetchFAQData();
    }
  }, []);

  const fetchFAQData = async () => {
    try {
      const data = await apiGet('/faq');
      
      // Handle both old array format and new object format
      if (Array.isArray(data)) {
        // Convert old array format to new object format
        setFaqData({
          id: 1,
          banner: {
            backgroundImage: {
              desktop: "faq/4963b601-8788-4697-b9fc-5a0ce4c4e5b4.jpeg",
              mobile: "faq/4963b601-8788-4697-b9fc-5a0ce4c4e5b4.jpeg"
            },
            height: "705px",
            objectPosition: "50% 50%",
            transform: {
              scale: 1,
              translateX: 0,
              translateY: 0
            }
          },
          items: data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } else {
        // Ensure items is always an array
        setFaqData({
          ...data,
          items: data.items || []
        });
      }
    } catch (error) {
      console.error('Error fetching FAQ data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFAQData = async () => {
    setSaving(true);
    try {
      await apiPut('/faq', {
        ...faqData,
        updatedAt: new Date().toISOString()
      });
      
      setMessage('FAQ data saved successfully!');
      setPreviewRefresh(Date.now());
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving FAQ data:', error);
      setMessage('Error saving FAQ data');
    } finally {
      setSaving(false);
    }
  };

  const handleBannerChange = (field: string, value: any) => {
    setFaqData(prev => ({
      ...prev,
      banner: {
        ...prev.banner,
        [field]: value
      }
    }));
  };

  const handleTransformChange = (field: string, value: number) => {
    setFaqData(prev => ({
      ...prev,
      banner: {
        ...prev.banner,
        transform: {
          ...prev.banner.transform!,
          [field]: value
        }
      }
    }));
  };

  const handleImageSelect = (imagePath: string) => {
    if (imageSelectMode === 'desktop') {
      setFaqData(prev => ({
        ...prev,
        banner: {
          ...prev.banner,
          backgroundImage: {
            ...prev.banner.backgroundImage,
            desktop: imagePath
          }
        }
      }));
    } else {
      setFaqData(prev => ({
        ...prev,
        banner: {
          ...prev.banner,
          backgroundImage: {
            ...prev.banner.backgroundImage,
            mobile: imagePath
          }
        }
      }));
    }
    setShowImageSelector(false);
  };

  const openImageSelector = (mode: 'desktop' | 'mobile') => {
    setImageSelectMode(mode);
    setShowImageSelector(true);
  };

  const handleAddFAQ = async () => {
    if (!newFAQ.question || !newFAQ.answer) {
      setMessage('Please fill in both question and answer fields');
      return;
    }

    setSaving(true);
    try {
      const newItem: FAQItem = {
        id: Math.max(...faqData.items.map(f => f.id || 0), 0) + 1,
        question: newFAQ.question,
        answer: newFAQ.answer,
        order: faqData.items.length + 1,
        category: 'general'
      };

      const updatedFaqData = {
        ...faqData,
        id: faqData.id || 1,
        items: [...faqData.items, newItem],
        updatedAt: new Date().toISOString(),
        createdAt: faqData.createdAt || new Date().toISOString()
      };

      // Save to database immediately
      console.log('Saving FAQ data:', updatedFaqData);
      await apiPut('/faq', updatedFaqData);

      // Update local state
      setFaqData(updatedFaqData);

      setNewFAQ({
        question: '',
        answer: ''
      });

      setMessage('FAQ added and saved successfully!');
      setPreviewRefresh(Date.now());
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding FAQ:', error);
      setMessage(`Error adding FAQ: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFAQ = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) {
      return;
    }

    setSaving(true);
    try {
      const updatedFaqData = {
        ...faqData,
        id: faqData.id || 1,
        items: faqData.items.filter(item => item.id !== id),
        updatedAt: new Date().toISOString(),
        createdAt: faqData.createdAt || new Date().toISOString()
      };

      // Save to database immediately
      console.log('Saving FAQ data:', updatedFaqData);
      await apiPut('/faq', updatedFaqData);

      // Update local state
      setFaqData(updatedFaqData);

      setMessage('FAQ deleted and saved successfully!');
      setPreviewRefresh(Date.now());
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      setMessage(`Error deleting FAQ: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setNewFAQ(prev => ({ ...prev, [field]: value }));
  };

  const handleDragStart = (e: React.DragEvent, itemId: number) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, itemId: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem(itemId);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDrop = async (e: React.DragEvent, dropTargetId: number) => {
    e.preventDefault();
    
    if (draggedItem === null || draggedItem === dropTargetId) {
      return;
    }

    const draggedIndex = faqData.items.findIndex(item => item.id === draggedItem);
    const dropIndex = faqData.items.findIndex(item => item.id === dropTargetId);

    if (draggedIndex === -1 || dropIndex === -1) {
      return;
    }

    // Create a new array with reordered items
    const newItems = [...faqData.items];
    const draggedItemData = newItems[draggedIndex];
    
    // Remove the dragged item from its current position
    newItems.splice(draggedIndex, 1);
    
    // Insert the dragged item at the new position
    newItems.splice(dropIndex, 0, draggedItemData);
    
    // Update order numbers based on new positions
    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      order: index + 1
    }));

    // Update the FAQ data and save
    setSaving(true);
    try {
      const updatedFaqData = {
        ...faqData,
        id: faqData.id || 1,
        items: reorderedItems,
        updatedAt: new Date().toISOString(),
        createdAt: faqData.createdAt || new Date().toISOString()
      };

      // Save to database immediately
      console.log('Saving FAQ data:', updatedFaqData);
      await apiPut('/faq', updatedFaqData);

      // Update local state
      setFaqData(updatedFaqData);

      setMessage('FAQ items reordered successfully!');
      setPreviewRefresh(Date.now());
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error reordering FAQ items:', error);
      setMessage(`Error reordering FAQ items: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setSaving(false);
    }

    setDraggedItem(null);
    setDragOverItem(null);
  };

  if (loading) {
    return <div className="p-8">Loading FAQ data...</div>;
  }

  return (
    <div className="flex h-full">
      {/* Left Column - Editor */}
      <div className="w-1/2 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">FAQ Editor</h2>
          <div className="flex gap-4">
            <button
              onClick={saveFAQData}
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <a
              href="http://localhost:3000/faq"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              View Live FAQ Page
            </a>
          </div>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('banner')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'banner'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Banner Settings
          </button>
          <button
            onClick={() => setActiveTab('items')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'items'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            FAQ Items ({faqData.items.length})
          </button>
        </div>

        {activeTab === 'banner' && (
          <div className="space-y-6">
            {/* Banner Configuration */}
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Banner Configuration</h3>
              
              {/* Desktop Image */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desktop Background Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
                      <span className="text-sm text-gray-600">
                        {faqData.banner.backgroundImage.desktop || 'No image selected'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => openImageSelector('desktop')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Select Image
                  </button>
                </div>
              </div>

              {/* Mobile Image */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Background Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
                      <span className="text-sm text-gray-600">
                        {faqData.banner.backgroundImage.mobile || 'No image selected'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => openImageSelector('mobile')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Select Image
                  </button>
                </div>
              </div>

              {/* Banner Height */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Height
                </label>
                <input
                  type="text"
                  value={faqData.banner.height}
                  onChange={(e) => handleBannerChange('height', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="705px"
                />
              </div>

              {/* Object Position */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Object Position
                </label>
                <input
                  type="text"
                  value={faqData.banner.objectPosition}
                  onChange={(e) => handleBannerChange('objectPosition', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="50% 50%"
                />
              </div>

              {/* Transform Controls */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scale
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={faqData.banner.transform?.scale || 1}
                    onChange={(e) => handleTransformChange('scale', parseFloat(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Translate X
                  </label>
                  <input
                    type="number"
                    value={faqData.banner.transform?.translateX || 0}
                    onChange={(e) => handleTransformChange('translateX', parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Translate Y
                  </label>
                  <input
                    type="number"
                    value={faqData.banner.transform?.translateY || 0}
                    onChange={(e) => handleTransformChange('translateY', parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'items' && (
          <div className="space-y-6">
            {/* Add New FAQ */}
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New FAQ</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question *
                  </label>
                  <input
                    type="text"
                    value={newFAQ.question}
                    onChange={(e) => handleInputChange('question', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="HOW LONG DOES IT TAKE TO CREATE A CUSTOM WIG?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Answer *
                  </label>
                  <textarea
                    value={newFAQ.answer}
                    onChange={(e) => handleInputChange('answer', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Enter the answer to this question..."
                  />
                </div>

              </div>

              <button
                onClick={handleAddFAQ}
                disabled={!newFAQ.question || !newFAQ.answer || saving}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Adding...' : 'Add FAQ'}
              </button>
            </div>

            {/* Existing FAQs */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  Existing FAQs ({faqData.items.length})
                </h3>
              </div>
              
              <div className="p-6">
                {faqData.items.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No FAQs found. Add your first FAQ above.</p>
                ) : (
                  <div className="space-y-6">
                    <div className="mb-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                      <strong>💡 Tip:</strong> Drag and drop FAQ items to reorder them. The order will be saved automatically.
                    </div>
                    {faqData.items
                      .sort((a, b) => (a.order || 0) - (b.order || 0))
                      .map((faq) => (
                        <div 
                          key={faq.id} 
                          draggable={!saving}
                          onDragStart={(e) => handleDragStart(e, faq.id)}
                          onDragOver={(e) => handleDragOver(e, faq.id)}
                          onDragEnd={handleDragEnd}
                          onDrop={(e) => handleDrop(e, faq.id)}
                          className={`border border-gray-200 rounded-lg p-6 cursor-move transition-all duration-200 ${
                            draggedItem === faq.id 
                              ? 'opacity-50 transform scale-95' 
                              : dragOverItem === faq.id 
                                ? 'border-blue-400 bg-blue-50' 
                                : 'hover:border-gray-300 hover:shadow-sm'
                          } ${saving ? 'cursor-not-allowed' : ''}`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-start flex-1">
                              {/* Drag Handle */}
                              <div className="mr-3 mt-1 text-gray-400 cursor-move">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                  <circle cx="4" cy="4" r="1.5"/>
                                  <circle cx="4" cy="8" r="1.5"/>
                                  <circle cx="4" cy="12" r="1.5"/>
                                  <circle cx="12" cy="4" r="1.5"/>
                                  <circle cx="12" cy="8" r="1.5"/>
                                  <circle cx="12" cy="12" r="1.5"/>
                                </svg>
                              </div>
                              
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 mb-2">
                                  {faq.question}
                                </h4>
                                <p className="text-gray-600 text-sm mb-4">
                                  {faq.answer}
                                </p>
                                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                  #{faq.order || 0}
                                </span>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => handleDeleteFAQ(faq.id)}
                              disabled={saving}
                              className="ml-4 bg-red-600 text-white py-2 px-4 rounded text-sm hover:bg-red-700 disabled:opacity-50"
                            >
                              {saving ? 'Deleting...' : 'Delete'}
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Live Preview */}
      <div className="w-1/2 border-l border-gray-300 bg-gray-50 overflow-y-auto">
        <div className="p-6">
          <LivePreviewPanel 
            baseUrl="http://localhost:3000/faq" 
            refreshTrigger={previewRefresh} 
          />
        </div>
      </div>

      {/* Image Selector Modal */}
      <ImageSelector
        isOpen={showImageSelector}
        onClose={() => setShowImageSelector(false)}
        onSelect={handleImageSelect}
        title={`Select ${imageSelectMode === 'desktop' ? 'Desktop' : 'Mobile'} Banner Image`}
        selectedImage={imageSelectMode === 'desktop' ? faqData.banner.backgroundImage.desktop : faqData.banner.backgroundImage.mobile}
      />
    </div>
  );
};

export default FAQEditor;