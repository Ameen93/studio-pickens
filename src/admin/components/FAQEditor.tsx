import React, { useState, useEffect } from 'react';
import { FAQData, FAQItem } from '../types';
import LivePreviewPanel from './LivePreview';
import ImageSelector from './ImageSelector';

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
    answer: '',
    order: 1
  });

  useEffect(() => {
    fetchFAQData();
  }, []);

  const fetchFAQData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/faq');
      const data = await response.json();
      
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
        setFaqData(data);
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
      const response = await fetch('http://localhost:3001/api/faq', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...faqData,
          updatedAt: new Date().toISOString()
        }),
      });
      
      if (response.ok) {
        setMessage('FAQ data saved successfully!');
        setPreviewRefresh(Date.now());
        setTimeout(() => setMessage(''), 3000);
      }
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

    const newItem: FAQItem = {
      id: Math.max(...faqData.items.map(f => f.id || 0), 0) + 1,
      question: newFAQ.question,
      answer: newFAQ.answer,
      order: newFAQ.order,
      category: 'general'
    };

    setFaqData(prev => ({
      ...prev,
      items: [...prev.items, newItem],
      updatedAt: new Date().toISOString()
    }));

    setNewFAQ({
      question: '',
      answer: '',
      order: Math.max(...faqData.items.map(f => f.order || 0), 0) + 1
    });

    setMessage('FAQ added! Remember to save changes.');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDeleteFAQ = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) {
      return;
    }

    setFaqData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
      updatedAt: new Date().toISOString()
    }));

    setMessage('FAQ deleted! Remember to save changes.');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setNewFAQ(prev => ({ ...prev, [field]: value }));
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

                <div className="w-32">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order
                  </label>
                  <input
                    type="number"
                    value={newFAQ.order}
                    onChange={(e) => handleInputChange('order', parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>
              </div>

              <button
                onClick={handleAddFAQ}
                disabled={!newFAQ.question || !newFAQ.answer}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Add FAQ
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
                    {faqData.items
                      .sort((a, b) => (a.order || 0) - (b.order || 0))
                      .map((faq) => (
                        <div key={faq.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 mb-2">
                                {faq.question}
                              </h4>
                              <p className="text-gray-600 text-sm mb-4">
                                {faq.answer}
                              </p>
                              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                Order: {faq.order || 0}
                              </span>
                            </div>
                            <button
                              onClick={() => handleDeleteFAQ(faq.id)}
                              className="ml-4 bg-red-600 text-white py-2 px-4 rounded text-sm hover:bg-red-700"
                            >
                              Delete
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