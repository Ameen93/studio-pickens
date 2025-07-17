import React, { useState } from 'react';

const MobileWorkItem = ({ project, content, onCategoryClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTap = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-12 last:mb-0">
      {/* Image with tap functionality */}
      <div 
        className="relative cursor-pointer"
        onClick={handleTap}
        style={{ aspectRatio: '9/16' }}
      >
        <img
          src={project.image || project.src}
          alt={project.alt}
          className="w-full h-full object-cover rounded-lg shadow-lg"
          style={{
            objectPosition: (project.image || project.src)?.includes('editorial2') || (project.image || project.src)?.includes('editorial3') ? 'center top' : 'center center'
          }}
        />
        
        {/* Category Label Circle */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onCategoryClick?.(project.category);
          }}
          className={`absolute bottom-8 w-24 h-24 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer z-20 ${
            project.id % 2 === 1 ? 'left-4' : 'right-4'
          } ${isExpanded ? 'bg-studio-orange' : 'bg-studio-blue'}`}
        >
          <span 
            className={`font-proxima-wide font-bold uppercase text-center leading-tight text-xs transition-colors duration-300 ${
              isExpanded ? 'text-studio-blue' : 'text-studio-orange'
            }`}
            style={{
              letterSpacing: '0.02em',
              transform: project.id % 2 === 1 ? 'rotate(-15deg)' : 'rotate(15deg)',
              whiteSpace: project.category === 'MUSIC VIDEO' ? 'pre-line' : 'nowrap'
            }}
          >
            {project.category === 'MUSIC VIDEO' ? 'MUSIC\nVIDEO' : project.category}
          </span>
        </button>
      </div>

      {/* Info Card - Displayed below image when expanded */}
      <div 
        className={`mt-4 bg-studio-bg p-6 transition-all duration-300 overflow-hidden ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {/* Title */}
        <h5 className="font-proxima-wide font-bold text-studio-blue text-lg uppercase tracking-wide mb-4">
          {content?.title}
        </h5>

        {/* Stylist Section */}
        <div className="mb-3">
          <h6 className="font-proxima-wide font-bold text-studio-blue text-xs uppercase tracking-wide mb-1">
            STYLIST
          </h6>
          <p className="font-lovtony font-normal italic lowercase text-2xl leading-[50%] text-studio-blue">
            {content?.stylist}
          </p>
          <div className="w-full h-px border-b border-dotted border-studio-blue mt-2"></div>
        </div>

        {/* Photographer Section */}
        <div className="mb-3">
          <h6 className="font-proxima-wide font-bold text-studio-blue text-xs uppercase tracking-wide mb-1">
            PHOTOGRAPHER
          </h6>
          <p className="font-lovtony font-normal italic lowercase text-2xl leading-[50%] text-studio-blue">
            {content?.photographer}
          </p>
          <div className="w-full h-px border-b border-dotted border-studio-blue mt-2"></div>
        </div>

        {/* Date Section */}
        <div>
          <h6 className="font-proxima-wide font-bold text-studio-blue text-xs uppercase tracking-wide mb-1">
            DATE
          </h6>
          <p className="font-lovtony font-normal italic lowercase text-2xl leading-[50%] text-studio-blue">
            {content?.date}
          </p>
          <div className="w-full h-px border-b border-dotted border-studio-blue mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default MobileWorkItem;