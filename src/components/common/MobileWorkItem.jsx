import React, { useState } from 'react';

const MobileWorkItem = ({ project, content, onCategoryClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  

  const handleTap = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-12 last:mb-0">
      {/* Image container */}
      <div 
        className="relative"
        style={{ aspectRatio: '9/16' }}
      >
        <img
          src={project.mobileImage || project.image || project.src}
          alt={project.alt}
          className="w-full h-full object-cover shadow-lg"
          style={{
            objectPosition: (project.mobileImage || project.image || project.src)?.includes('editorial2') || (project.mobileImage || project.image || project.src)?.includes('editorial3') ? 'center top' : 'center center'
          }}
        />
        
        {/* Category Label Circle */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleTap();
          }}
          className={`absolute bottom-8 w-24 h-24 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer z-20 ${
            project.id % 2 === 1 ? 'left-4' : 'right-4'
          } ${isExpanded ? 'bg-studio-bg border-2 border-studio-blue' : 'bg-studio-blue'}`}
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
          isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {/* Title */}
        <h5 className="font-proxima-wide font-bold text-studio-blue text-lg uppercase tracking-wide mb-4">
          {content?.title || project.title}
        </h5>

        {/* Photographer Section */}
        <div className="mb-3">
          <h6 className="font-proxima-nova font-semibold text-studio-blue text-xs uppercase tracking-wide mb-1">
            {content?.labels?.photographer || 'PHOTOGRAPHER'}
          </h6>
          <p className="font-lovtony font-normal italic lowercase text-[6rem] leading-[50%] text-studio-blue">
            {content?.photographer}
          </p>
          <div className="w-full h-px border-b border-dotted border-studio-blue mt-2"></div>
        </div>

        {/* Stylist Section */}
        <div className="mb-3">
          <h6 className="font-proxima-nova font-semibold text-studio-blue text-xs uppercase tracking-wide mb-1">
            {content?.labels?.stylist || 'STYLIST'}
          </h6>
          <p className="font-lovtony font-normal italic lowercase text-[6rem] leading-[50%] text-studio-blue">
            {content?.stylist}
          </p>
          <div className="w-full h-px border-b border-dotted border-studio-blue mt-2"></div>
        </div>

        {/* Date Section */}
        <div>
          <h6 className="font-proxima-nova font-semibold text-studio-blue text-xs uppercase tracking-wide mb-1">
            {content?.labels?.date || 'DATE'}
          </h6>
          <p className="font-lovtony font-normal italic lowercase text-[6rem] leading-[50%] text-studio-blue">
            {content?.date}
          </p>
          <div className="w-full h-px border-b border-dotted border-studio-blue mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default MobileWorkItem;