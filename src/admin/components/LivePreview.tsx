import React, { useState, useEffect } from 'react';

interface LivePreviewProps {
  url: string;
  title: string;
  width: number;
  height: number;
  scale: number;
  refreshTrigger?: number;
}

const LivePreview: React.FC<LivePreviewProps> = ({ url, title, width, height, scale, refreshTrigger }) => {
  const [key, setKey] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (refreshTrigger) {
      setKey(prev => prev + 1);
    }
  }, [refreshTrigger]);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    return () => window.removeEventListener('resize', updateContainerWidth);
  }, []);

  // Calculate scale to fit container width, prioritizing filling the container
  // Leave a small margin for padding/borders
  const calculatedScale = containerWidth > 0 ? ((containerWidth - 8) / width) : scale;
  const scaledHeight = height * calculatedScale;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
        <h4 className="text-sm font-medium text-gray-700">{title}</h4>
        <p className="text-xs text-gray-500">{width} × {height}px (Scale: {Math.round(calculatedScale * 100)}%)</p>
      </div>
      <div 
        ref={containerRef}
        className="bg-gray-200 overflow-hidden w-full"
        style={{ 
          height: `${scaledHeight}px`
        }}
      >
        <iframe
          key={key}
          src={url}
          width={width}
          height={height}
          style={{
            transform: `scale(${calculatedScale})`,
            transformOrigin: 'top left',
            border: 'none',
            width: `${width}px`,
            height: `${height}px`
          }}
          title={title}
          className="bg-white"
        />
      </div>
    </div>
  );
};

interface LivePreviewPanelProps {
  baseUrl?: string;
  refreshTrigger?: number;
}

const LivePreviewPanel: React.FC<LivePreviewPanelProps> = ({ 
  baseUrl = 'http://localhost:3000', 
  refreshTrigger = 0 
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activePreview, setActivePreview] = useState('fullhd'); // Default to 1080p

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const previews = [
    {
      id: '4k',
      title: '4K Desktop',
      width: 3840,
      height: 2160,
      scale: 0.15,
      url: baseUrl
    },
    {
      id: 'fullhd',
      title: 'Full HD Desktop',
      width: 1920,
      height: 1080,
      scale: 0.3,
      url: baseUrl
    },
    {
      id: 'mobile-portrait',
      title: 'Mobile Portrait',
      width: 375,
      height: 812,
      scale: 0.6,
      url: baseUrl
    },
    {
      id: 'mobile-landscape',
      title: 'Mobile Landscape',
      width: 812,
      height: 375,
      scale: 0.6,
      url: baseUrl
    }
  ];

  const currentPreview = previews.find(p => p.id === activePreview) || previews[1];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Live Preview</h3>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      
      {/* Tab Switcher */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-1">
          {previews.map((preview) => (
            <button
              key={preview.id}
              onClick={() => setActivePreview(preview.id)}
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                activePreview === preview.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {preview.title}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
        <p>👁️ Live preview shows the actual website with your changes.</p>
        <p>💾 Changes appear automatically after saving.</p>
      </div>

      <div>
        <LivePreview
          key={`${currentPreview.id}-${activePreview}`}
          url={currentPreview.url}
          title={currentPreview.title}
          width={currentPreview.width}
          height={currentPreview.height}
          scale={currentPreview.scale}
          refreshTrigger={isRefreshing ? Date.now() : refreshTrigger}
        />
      </div>
    </div>
  );
};

export default LivePreviewPanel;