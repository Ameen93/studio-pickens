import React from 'react';

const WorkItem = ({ project, content, getCirclePosition, getTextRotation, getTextHoverRotation, getImageShift, getContentPosition }) => {
  return (
    <div
      className="absolute group cursor-pointer"
      style={{ 
        left: `clamp(${project.left * 0.2}px, ${(project.left / 1440) * 100}vw, ${project.left}px)`,
        top: `clamp(${project.top * 0.2}px, ${(project.top / 1440) * 100}vw, ${project.top}px)`,
        width: 'clamp(300px, 45.83vw, 660px)',
        height: 'clamp(169px, 25.83vw, 372px)',
      }}
    >
      {/* Project Image */}
      <img
        src={project.src}
        alt={project.alt}
        className={`w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-500 ease-out group-hover:${getImageShift(project.side)}`}
        style={{
          objectPosition: project.src.includes('editorial2') || project.src.includes('editorial3') ? 'center top' : 'center center'
        }}
      />
      
      {/* Category Label Circle */}
      <div 
        className={`absolute top-1/2 ${getCirclePosition(project.side)} bg-studio-blue group-hover:bg-studio-orange rounded-full flex items-center justify-center transition-colors duration-300`}
        style={{
          width: 'clamp(64px, 6.69vw, 96px)',
          height: 'clamp(64px, 6.69vw, 96px)',
          transform: 'translateY(-50%)',
          paddingTop: 'clamp(29px, 3.06vw, 44px)',
          paddingBottom: 'clamp(29px, 3.06vw, 44px)',
          paddingLeft: 'clamp(6px, 0.63vw, 9px)',
          paddingRight: 'clamp(6px, 0.63vw, 9px)'
        }}
      >
        <span 
          className={`text-studio-orange group-hover:text-studio-blue font-proxima-wide font-bold uppercase text-center leading-tight whitespace-nowrap transition-all duration-300 ${getTextHoverRotation(project.side)}`}
          style={{
            fontSize: 'clamp(7px, 0.69vw, 10px)',
            letterSpacing: '0.02em',
            transform: getTextRotation(project.side)
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Content Panel - Only visible on hover */}
      <div 
        className={`absolute top-0 ${getContentPosition(project.side)} bg-studio-bg p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 w-full h-full`}
      >
        {/* Title */}
        <h5 className="font-proxima-wide font-bold text-studio-blue text-xl uppercase tracking-wide mb-6">
          {content?.title}
        </h5>

        {/* Stylist Section */}
        <div className="mb-4">
          <h6 className="font-proxima-wide font-bold text-studio-blue text-sm uppercase tracking-wide mb-1">
            STYLIST
          </h6>
          <p className="font-lovtony font-normal italic lowercase text-[40px] leading-[50%] text-studio-blue">
            {content?.stylist}
          </p>
          <div className="w-full h-px border-b border-dotted border-studio-blue mt-2"></div>
        </div>

        {/* Photographer Section */}
        <div className="mb-4">
          <h6 className="font-proxima-wide font-bold text-studio-blue text-sm uppercase tracking-wide mb-1">
            PHOTOGRAPHER
          </h6>
          <p className="font-lovtony font-normal italic lowercase text-[40px] leading-[50%] text-studio-blue">
            {content?.photographer}
          </p>
          <div className="w-full h-px border-b border-dotted border-studio-blue mt-2"></div>
        </div>

        {/* Date Section */}
        <div>
          <h6 className="font-proxima-wide font-bold text-studio-blue text-sm uppercase tracking-wide mb-1">
            DATE
          </h6>
          <p className="font-lovtony font-normal italic lowercase text-[40px] leading-[50%] text-studio-blue">
            {content?.date}
          </p>
          <div className="w-full h-px border-b border-dotted border-studio-blue mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default WorkItem;