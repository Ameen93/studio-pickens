import React, { useState, useEffect } from 'react';
import { WorkProject, WorkData } from '../types';
import LivePreviewPanel from './LivePreview';
import ImageUpload from './ImageUpload';
import { apiGet, apiPut, apiPost, apiDelete, checkAuthToken } from '../utils/api';

const WorkEditor = () => {
  const [workData, setWorkData] = useState<WorkData>({
    banner: { 
      backgroundImage: { desktop: '', mobile: '' }, 
      title: 'Selected Work', 
      subtitle: 'Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus.',
      transform: {
        scale: 1,
        translateX: 0,
        translateY: 0,
        objectPosition: 'center center'
      }
    },
    sectionBanners: [],
    projects: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [previewRefresh, setPreviewRefresh] = useState(0);
  const [newProject, setNewProject] = useState({
    title: '',
    client: '',
    category: 'EDITORIAL',
    year: new Date().getFullYear(),
    image: ''
  });

  const categories = [
    'EDITORIAL',
    'FILM & TV',
    'THEATRE',
    'CONCERT',
    'MUSIC VIDEO',
    'LIVE'
  ];

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
    if (checkAuthToken()) {
      fetchWorkData();
    }
  }, []);

  const fetchWorkData = async () => {
    try {
      const data = await apiGet('/work');
      if (data && data.banner && data.projects) {
        setWorkData({
          ...data,
          sectionBanners: data.sectionBanners || [],
          banner: {
            ...data.banner,
            transform: data.banner.transform || {
              scale: 1,
              translateX: 0,
              translateY: 0,
              objectPosition: 'center center'
            }
          }
        });
      } else {
        // Handle legacy format
        setWorkData({
          banner: { 
            backgroundImage: { desktop: '', mobile: '' }, 
            title: 'Selected Work', 
            subtitle: 'Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus.',
            transform: {
              scale: 1,
              translateX: 0,
              translateY: 0,
              objectPosition: 'center center'
            }
          },
          sectionBanners: [],
          projects: Array.isArray(data) ? data : []
        });
      }
    } catch (error) {
      console.error('Error fetching work data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async () => {
    if (!newProject.title || !newProject.client) {
      setMessage('Please fill in title and client fields');
      return;
    }

    setSaving(true);
    try {
      await apiPost('/work', newProject);
      
      setMessage('Project added successfully!');
      setNewProject({
        title: '',
        client: '',
        category: 'EDITORIAL',
        year: new Date().getFullYear(),
        image: ''
      });
      fetchWorkData();
      setPreviewRefresh(Date.now()); // Trigger preview refresh
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding project:', error);
      setMessage('Error adding project');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await apiDelete(`/work/${id}`);
      
      setMessage('Project deleted successfully!');
      fetchWorkData();
      setPreviewRefresh(Date.now()); // Trigger preview refresh
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting project:', error);
      setMessage('Error deleting project');
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setNewProject(prev => ({ ...prev, [field]: value }));
  };

  const handleBannerChange = (field: string, value: string) => {
    if (field === 'backgroundImage.desktop' || field === 'backgroundImage.mobile') {
      const imageType = field.split('.')[1];
      setWorkData(prev => ({
        ...prev,
        banner: { 
          ...prev.banner, 
          backgroundImage: { 
            ...prev.banner.backgroundImage || {}, 
            [imageType]: value 
          }
        }
      }));
    } else {
      setWorkData(prev => ({
        ...prev,
        banner: { ...prev.banner, [field]: value }
      }));
    }
  };

  const handleBannerTransformChange = (field: keyof NonNullable<WorkData['banner']['transform']>, value: number | string) => {
    setWorkData(prev => ({
      ...prev,
      banner: {
        ...prev.banner,
        transform: {
          scale: 1,
          translateX: 0,
          translateY: 0,
          objectPosition: 'center center',
          ...prev.banner.transform,
          [field]: value
        }
      }
    }));
  };

  const handleSectionBannerChange = (index: number, field: string, value: string) => {
    setWorkData(prev => ({
      ...prev,
      sectionBanners: prev.sectionBanners.map((banner, i) =>
        i === index ? { ...banner, [field]: value } : banner
      )
    }));
  };

  const handleSectionBannerTransformChange = (index: number, field: keyof WorkData['sectionBanners'][0]['transform'], value: number | string) => {
    setWorkData(prev => ({
      ...prev,
      sectionBanners: prev.sectionBanners.map((banner, i) =>
        i === index ? {
          ...banner,
          transform: {
            ...banner.transform,
            [field]: value
          }
        } : banner
      )
    }));
  };

  const handleSaveBanner = async () => {
    setSaving(true);
    try {
      await apiPut('/work', workData);
      
      setMessage('Banner updated successfully!');
      setPreviewRefresh(Date.now());
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving banner:', error);
      setMessage('Error saving banner');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading work data...</div>;
  }

  return (
    <div className="flex h-full">
      {/* Left Column - Editor */}
      <div className="w-1/2 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Work Gallery Editor</h2>
          <a
            href="http://localhost:3000/work"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            View Live Work Page
          </a>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}

        <div className="space-y-6">
          {/* Banner Editor */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Banner Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Title
                </label>
                <input
                  type="text"
                  value={workData.banner.title}
                  onChange={(e) => handleBannerChange('title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="WORK"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Subtitle
                </label>
                <textarea
                  value={workData.banner.subtitle}
                  onChange={(e) => handleBannerChange('subtitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Portfolio & Gallery"
                />
              </div>

              <div>
                <ImageUpload
                  label="Desktop Background Image"
                  value={workData.banner.backgroundImage?.desktop || ''}
                  onChange={(path) => handleBannerChange('backgroundImage.desktop', path)}
                  placeholder="/images/work/work-banner-desktop.jpg"
                  previewClassName="w-40 h-24"
                />
              </div>

              <div>
                <ImageUpload
                  label="Mobile Background Image"
                  value={workData.banner.backgroundImage?.mobile || ''}
                  onChange={(path) => handleBannerChange('backgroundImage.mobile', path)}
                  placeholder="/images/work/work-banner-mobile.jpg"
                  previewClassName="w-40 h-24"
                />
              </div>
            </div>

            {/* Transform Controls */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Background Image Transform</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Scale: {workData.banner.transform?.scale || 1}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={workData.banner.transform?.scale || 1}
                    onChange={(e) => handleBannerTransformChange('scale', parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Position
                  </label>
                  <select
                    value={workData.banner.transform?.objectPosition || 'center center'}
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
                    Translate X: {workData.banner.transform?.translateX || 0}px
                  </label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    step="1"
                    value={workData.banner.transform?.translateX || 0}
                    onChange={(e) => handleBannerTransformChange('translateX', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Translate Y: {workData.banner.transform?.translateY || 0}px
                  </label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    step="1"
                    value={workData.banner.transform?.translateY || 0}
                    onChange={(e) => handleBannerTransformChange('translateY', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveBanner}
              disabled={saving}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Banner'}
            </button>
          </div>

          {/* Section Banners Editor */}
          <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Section Banners</h3>
            
            <div className="space-y-6">
              {workData.sectionBanners?.map((banner, index) => (
                <div key={banner.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                  <h4 className="font-medium text-gray-700 mb-4">{banner.title}</h4>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <ImageUpload
                          label="Banner Image"
                          value={banner.image}
                          onChange={(path) => handleSectionBannerChange(index, 'image', path)}
                          placeholder="/images/work/banner.jpg"
                          previewClassName="w-32 h-16"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Alt Text
                        </label>
                        <input
                          type="text"
                          value={banner.alt}
                          onChange={(e) => handleSectionBannerChange(index, 'alt', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          placeholder="Banner description"
                        />
                      </div>
                    </div>

                    {/* Transform Controls */}
                    <div className="border-t pt-3">
                      <h5 className="text-sm font-medium text-gray-600 mb-3">Transform</h5>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Scale: {banner.transform.scale}x
                          </label>
                          <input
                            type="range"
                            min="0.5"
                            max="3"
                            step="0.1"
                            value={banner.transform.scale}
                            onChange={(e) => handleSectionBannerTransformChange(index, 'scale', parseFloat(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Position
                          </label>
                          <select
                            value={banner.transform.objectPosition}
                            onChange={(e) => handleSectionBannerTransformChange(index, 'objectPosition', e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
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
                            Translate X: {banner.transform.translateX}px
                          </label>
                          <input
                            type="range"
                            min="-100"
                            max="100"
                            step="1"
                            value={banner.transform.translateX}
                            onChange={(e) => handleSectionBannerTransformChange(index, 'translateX', parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Translate Y: {banner.transform.translateY}px
                          </label>
                          <input
                            type="range"
                            min="-100"
                            max="100"
                            step="1"
                            value={banner.transform.translateY}
                            onChange={(e) => handleSectionBannerTransformChange(index, 'translateY', parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Project */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Project</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="VOGUE HONG KONG"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client *
                </label>
                <input
                  type="text"
                  value={newProject.client}
                  onChange={(e) => handleInputChange('client', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Vogue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newProject.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  value={newProject.year}
                  onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="2000"
                  max="2030"
                />
              </div>

              <div className="md:col-span-2">
                <ImageUpload
                  label="Project Image"
                  value={newProject.image}
                  onChange={(path) => handleInputChange('image', path)}
                  placeholder="/images/work/editorial.jpg"
                  previewClassName="w-32 h-20"
                  required
                />
              </div>
            </div>

            <button
              onClick={handleAddProject}
              disabled={saving || !newProject.title || !newProject.client}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Adding...' : 'Add Project'}
            </button>
          </div>

          {/* Existing Projects */}
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Existing Projects ({workData.projects.length})
              </h3>
            </div>
            
            <div className="p-6">
              {workData.projects.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No projects found. Add your first project above.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {workData.projects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-32 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      )}
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800 mb-1">{project.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{project.client} • {project.year}</p>
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {project.category}
                        </span>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="mt-3 w-full bg-red-600 text-white py-2 px-4 rounded text-sm hover:bg-red-700"
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
      </div>

      {/* Right Column - Live Preview */}
      <div className="w-1/2 border-l border-gray-300 bg-gray-50 overflow-y-auto">
        <div className="p-6">
          <LivePreviewPanel 
            baseUrl="http://localhost:3000/work" 
            refreshTrigger={previewRefresh} 
          />
        </div>
      </div>
    </div>
  );
};

export default WorkEditor;