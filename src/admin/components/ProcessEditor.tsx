import React, { useState, useEffect } from 'react';
import { ProcessData, ProcessStep } from '../types';
import LivePreviewPanel from './LivePreview';
import ImageUpload from './ImageUpload';

const ProcessEditor = () => {
  const [processData, setProcessData] = useState<ProcessData>({
    id: 1,
    banner: {
      backgroundImage: {
        desktop: "/images/process/banner/Desktop_PROCESS Hero Banner v2.png",
        mobile: "/images/process/banner/Mobile_Hero Banner_process.png"
      },
      title: "Process",
      subtitle: "",
      transform: {
        scale: 1,
        translateX: 0,
        translateY: 0,
        objectPosition: "center center"
      },
      circle: {
        size: {
          scale: 1
        }
      },
      heading: {
        size: {
          scale: 1
        }
      }
    },
    teamCircles: {
      size: {
        scale: 1
      },
      strokeWidth: 2,
      gap: 20,
      position: {
        top: "340px",
        left: "50%"
      }
    },
    processSteps: [],
    createdAt: "",
    updatedAt: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [previewRefresh, setPreviewRefresh] = useState(0);
  const [newStep, setNewStep] = useState<Partial<ProcessStep>>({
    title: '',
    description: '',
    image: '',
    alt: '',
    alignment: 'left',
    transform: {
      scale: 1,
      translateX: 0,
      translateY: 0,
      objectPosition: 'center center'
    }
  });

  const objectPositionOptions = [
    'center center',
    'center top',
    'center bottom',
    'left center',
    'left top',
    'left bottom',
    'right center',
    'right top',
    'right bottom'
  ];

  useEffect(() => {
    fetchProcessData();
  }, []);

  const fetchProcessData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/process');
      if (!response.ok) {
        throw new Error('Failed to fetch process data');
      }
      const data = await response.json();
      setProcessData(data);
    } catch (error) {
      console.error('Error fetching process data:', error);
      setMessage('Error fetching process data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`http://localhost:3001/api/process/${processData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processData),
      });
      
      if (response.ok) {
        setMessage('Process page updated successfully!');
        setPreviewRefresh(Date.now());
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || 'Failed to save'}`);
      }
    } catch (error) {
      console.error('Error saving process data:', error);
      setMessage('Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  const handleBannerChange = (field: keyof ProcessData['banner'], value: string) => {
    setProcessData(prev => ({
      ...prev,
      banner: {
        ...prev.banner,
        [field]: value
      }
    }));
  };

  const handleBannerTransformChange = (field: keyof ProcessData['banner']['transform'], value: number | string) => {
    setProcessData(prev => ({
      ...prev,
      banner: {
        ...prev.banner,
        transform: {
          ...prev.banner.transform,
          [field]: value
        }
      }
    }));
  };

  const handleBannerCircleChange = (field: keyof ProcessData['banner']['circle']['size'], value: number) => {
    setProcessData(prev => ({
      ...prev,
      banner: {
        ...prev.banner,
        circle: {
          ...prev.banner.circle,
          size: {
            ...prev.banner.circle.size,
            [field]: value
          }
        }
      }
    }));
  };

  const handleBannerHeadingChange = (field: keyof ProcessData['banner']['heading']['size'], value: number) => {
    setProcessData(prev => ({
      ...prev,
      banner: {
        ...prev.banner,
        heading: {
          ...prev.banner.heading,
          size: {
            ...prev.banner.heading.size,
            [field]: value
          }
        }
      }
    }));
  };

  const handleTeamCircleChange = (field: string, value: any) => {
    setProcessData(prev => ({
      ...prev,
      teamCircles: {
        ...prev.teamCircles,
        [field]: value
      }
    }));
  };

  const handleImageChange = (imageType: 'desktop' | 'mobile', path: string) => {
    setProcessData(prev => ({
      ...prev,
      banner: {
        ...prev.banner,
        backgroundImage: {
          ...prev.banner.backgroundImage,
          [imageType]: path
        }
      }
    }));
  };

  const handleAddStep = async () => {
    if (!newStep.title || !newStep.description) {
      setMessage('Please fill in title and description fields');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('http://localhost:3001/api/process/steps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStep),
      });
      
      if (response.ok) {
        setMessage('Process step added successfully!');
        setNewStep({
          title: '',
          description: '',
          image: '',
          alt: '',
          alignment: 'left',
          transform: {
            scale: 1,
            translateX: 0,
            translateY: 0,
            objectPosition: 'center center'
          }
        });
        fetchProcessData();
        setPreviewRefresh(Date.now());
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || 'Failed to add step'}`);
      }
    } catch (error) {
      console.error('Error adding step:', error);
      setMessage('Error adding step');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateStep = async (stepId: number, updatedStep: ProcessStep) => {
    setSaving(true);
    try {
      const response = await fetch(`http://localhost:3001/api/process/steps/${stepId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStep),
      });
      
      if (response.ok) {
        setMessage('Process step updated successfully!');
        fetchProcessData();
        setPreviewRefresh(Date.now());
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || 'Failed to update step'}`);
      }
    } catch (error) {
      console.error('Error updating step:', error);
      setMessage('Error updating step');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStep = async (stepId: number) => {
    if (!window.confirm('Are you sure you want to delete this process step?')) {
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`http://localhost:3001/api/process/steps/${stepId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setMessage('Process step deleted successfully!');
        fetchProcessData();
        setPreviewRefresh(Date.now());
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || 'Failed to delete step'}`);
      }
    } catch (error) {
      console.error('Error deleting step:', error);
      setMessage('Error deleting step');
    } finally {
      setSaving(false);
    }
  };

  const handleStepChange = (stepId: number, field: keyof ProcessStep, value: any) => {
    setProcessData(prev => ({
      ...prev,
      processSteps: prev.processSteps.map(step =>
        step.id === stepId ? { ...step, [field]: value } : step
      )
    }));
  };

  const handleStepTransformChange = (stepId: number, field: keyof ProcessStep['transform'], value: number | string) => {
    setProcessData(prev => ({
      ...prev,
      processSteps: prev.processSteps.map(step =>
        step.id === stepId ? {
          ...step,
          transform: {
            ...step.transform,
            [field]: value
          }
        } : step
      )
    }));
  };

  const handleNewStepChange = (field: keyof ProcessStep, value: any) => {
    setNewStep(prev => ({ ...prev, [field]: value }));
  };

  const handleNewStepTransformChange = (field: keyof ProcessStep['transform'], value: number | string) => {
    setNewStep(prev => ({
      ...prev,
      transform: {
        ...prev.transform!,
        [field]: value
      }
    }));
  };

  if (loading) {
    return <div className="p-8">Loading process data...</div>;
  }

  return (
    <div className="flex h-full">
      {/* Left Column - Editor */}
      <div className="w-1/2 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Process Page Editor</h2>
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
          {/* Banner Section */}
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Banner Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={processData.banner.title}
                  onChange={(e) => handleBannerChange('title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Process"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle (Optional)
                </label>
                <textarea
                  value={processData.banner.subtitle}
                  onChange={(e) => handleBannerChange('subtitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Optional subtitle..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <ImageUpload
                    label="Desktop Background"
                    value={processData.banner.backgroundImage.desktop}
                    onChange={(path) => handleImageChange('desktop', path)}
                    placeholder="/images/process/banner/desktop-banner.png"
                    previewClassName="w-32 h-20"
                  />
                </div>
                <div>
                  <ImageUpload
                    label="Mobile Background"
                    value={processData.banner.backgroundImage.mobile}
                    onChange={(path) => handleImageChange('mobile', path)}
                    placeholder="/images/process/banner/mobile-banner.png"
                    previewClassName="w-20 h-32"
                  />
                </div>
              </div>

              {/* Transform Controls */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Background Image Transform</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Scale: {processData.banner.transform.scale}x
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={processData.banner.transform.scale}
                      onChange={(e) => handleBannerTransformChange('scale', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Position
                    </label>
                    <select
                      value={processData.banner.transform.objectPosition}
                      onChange={(e) => handleBannerTransformChange('objectPosition', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      {objectPositionOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Translate X: {processData.banner.transform.translateX}px
                    </label>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      step="1"
                      value={processData.banner.transform.translateX}
                      onChange={(e) => handleBannerTransformChange('translateX', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Translate Y: {processData.banner.transform.translateY}px
                    </label>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      step="1"
                      value={processData.banner.transform.translateY}
                      onChange={(e) => handleBannerTransformChange('translateY', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Circle and Heading Size Controls */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Circle & Heading Size (1080p Baseline)</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Circle Scale: {processData.banner.circle.size.scale}x (Base: 513px @ 1080p)
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={processData.banner.circle.size.scale}
                      onChange={(e) => handleBannerCircleChange('scale', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="mt-1 text-xs text-gray-500">
                      Responsive: scales with viewport width
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Heading Scale: {processData.banner.heading.size.scale}x (Base: 55px @ 1080p)
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={processData.banner.heading.size.scale}
                      onChange={(e) => handleBannerHeadingChange('scale', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="mt-1 text-xs text-gray-500">
                      Responsive: scales with viewport width
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Circles Settings */}
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Team Section Circles</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Circle Size */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Circle Scale: {processData.teamCircles?.size?.scale || 1}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={processData.teamCircles?.size?.scale || 1}
                  onChange={(e) => handleTeamCircleChange('size', { scale: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <div className="mt-1 text-xs text-gray-500">
                  Base sizes: 280px, 340px, 400px (desktop)
                </div>
              </div>
              
              {/* Stroke Width */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Stroke Width: {processData.teamCircles?.strokeWidth || 2}px
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={processData.teamCircles?.strokeWidth || 2}
                  onChange={(e) => handleTeamCircleChange('strokeWidth', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="mt-1 text-xs text-gray-500">
                  Circle border thickness
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Gap Between Circles */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Gap Between Circles: {processData.teamCircles?.gap || 20}px
                </label>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={processData.teamCircles?.gap || 20}
                  onChange={(e) => handleTeamCircleChange('gap', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="mt-1 text-xs text-gray-500">
                  Spacing between concentric circles
                </div>
              </div>
              
              {/* Position */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Vertical Position: {processData.teamCircles?.position?.top || '340px'}
                </label>
                <input
                  type="range"
                  min="200"
                  max="500"
                  step="10"
                  value={parseInt(processData.teamCircles?.position?.top?.replace('px', '') || '340')}
                  onChange={(e) => handleTeamCircleChange('position', { 
                    ...processData.teamCircles?.position, 
                    top: `${e.target.value}px` 
                  })}
                  className="w-full"
                />
                <div className="mt-1 text-xs text-gray-500">
                  Vertical position from top
                </div>
              </div>
            </div>
          </div>

          {/* Process Steps Management */}
          <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Process Steps</h3>
            
            {/* Add New Step */}
            <div className="mb-8 p-4 bg-white border border-gray-200 rounded-lg">
              <h4 className="text-md font-medium text-gray-700 mb-4">Add New Process Step</h4>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={newStep.title || ''}
                      onChange={(e) => handleNewStepChange('title', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Step title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alignment
                    </label>
                    <select
                      value={newStep.alignment || 'left'}
                      onChange={(e) => handleNewStepChange('alignment', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={newStep.description || ''}
                    onChange={(e) => handleNewStepChange('description', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Step description"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <ImageUpload
                      label="Step Image"
                      value={newStep.image || ''}
                      onChange={(path) => handleNewStepChange('image', path)}
                      placeholder="/images/process/step-image.jpg"
                      previewClassName="w-32 h-20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alt Text
                    </label>
                    <input
                      type="text"
                      value={newStep.alt || ''}
                      onChange={(e) => handleNewStepChange('alt', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Image description"
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleAddStep}
                  disabled={saving || !newStep.title || !newStep.description}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {saving ? 'Adding...' : 'Add Process Step'}
                </button>
              </div>
            </div>
            
            {/* Existing Steps */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-700">
                Current Steps ({processData.processSteps.length})
              </h4>
              
              {processData.processSteps.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No process steps found. Add your first step above.</p>
              ) : (
                processData.processSteps
                  .sort((a, b) => a.order - b.order)
                  .map((step, index) => (
                    <div key={step.id} className="p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <h5 className="font-medium text-gray-800">Step {step.order}: {step.title}</h5>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateStep(step.id, step)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDeleteStep(step.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                          </label>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) => handleStepChange(step.id, 'title', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Alignment
                          </label>
                          <select
                            value={step.alignment}
                            onChange={(e) => handleStepChange(step.id, 'alignment', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={step.description}
                          onChange={(e) => handleStepChange(step.id, 'description', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <ImageUpload
                            label="Step Image"
                            value={step.image}
                            onChange={(path) => handleStepChange(step.id, 'image', path)}
                            placeholder="/images/process/step-image.jpg"
                            previewClassName="w-24 h-16"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Alt Text
                          </label>
                          <input
                            type="text"
                            value={step.alt}
                            onChange={(e) => handleStepChange(step.id, 'alt', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="Image description"
                          />
                        </div>
                      </div>
                      
                      {/* Transform Controls */}
                      <div className="border-t pt-3">
                        <h6 className="text-sm font-medium text-gray-600 mb-3">Image Transform</h6>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Scale: {step.transform.scale}x
                            </label>
                            <input
                              type="range"
                              min="0.5"
                              max="3"
                              step="0.1"
                              value={step.transform.scale}
                              onChange={(e) => handleStepTransformChange(step.id, 'scale', parseFloat(e.target.value))}
                              className="w-full"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Position
                            </label>
                            <select
                              value={step.transform.objectPosition}
                              onChange={(e) => handleStepTransformChange(step.id, 'objectPosition', e.target.value)}
                              className="w-full p-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                            >
                              {objectPositionOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Translate X: {step.transform.translateX}px
                            </label>
                            <input
                              type="range"
                              min="-100"
                              max="100"
                              step="1"
                              value={step.transform.translateX}
                              onChange={(e) => handleStepTransformChange(step.id, 'translateX', parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Translate Y: {step.transform.translateY}px
                            </label>
                            <input
                              type="range"
                              min="-100"
                              max="100"
                              step="1"
                              value={step.transform.translateY}
                              onChange={(e) => handleStepTransformChange(step.id, 'translateY', parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>
                        </div>
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
              The process page banner includes a rotating dashed circle and center title that are part of the design. 
              Use the transform controls above to adjust the background image positioning and scale.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Live Preview */}
      <div className="w-1/2 border-l border-gray-300 bg-gray-50 overflow-y-auto">
        <div className="p-6">
          <LivePreviewPanel 
            baseUrl="http://localhost:3000/process" 
            refreshTrigger={previewRefresh} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProcessEditor;