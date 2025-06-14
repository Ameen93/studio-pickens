import React from 'react';
import { WORK_PROJECTS } from '../constants';

const WorkGallery = () => {
  const getCirclePosition = (side) => {
    // Position circles on the left for left images, right for right images
    if (side === 'left') return '-left-12';
    if (side === 'right') return '-right-12';
    return '-left-12'; // center images use left positioning
  };

  const getTextRotation = (side) => {
    // Counter-clockwise for left side, clockwise for right side
    if (side === 'left') return 'rotate(-25deg)';
    if (side === 'right') return 'rotate(25deg)';
    return 'rotate(-25deg)'; // center images use counter-clockwise
  };

  return (
    <section className="bg-studio-bg py-16 relative w-full max-w-[1440px] mx-auto overflow-visible">
      <div 
        className="relative w-full"
        style={{ 
          height: 'clamp(2400px, 250vw, 3636px)'
        }}
      >
        {WORK_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="absolute"
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
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
            
            {/* Category Label Circle */}
            <div 
              className={`absolute top-1/2 ${getCirclePosition(project.side)} bg-studio-blue rounded-full flex items-center justify-center`}
              style={{
                width: 'clamp(64px, 6.69vw, 96px)', // 96.36/1440 = 6.69%
                height: 'clamp(64px, 6.69vw, 96px)',
                transform: 'translateY(-50%)',
                paddingTop: 'clamp(29px, 3.06vw, 44px)', // 44/1440 = 3.06%
                paddingBottom: 'clamp(29px, 3.06vw, 44px)',
                paddingLeft: 'clamp(6px, 0.63vw, 9px)', // 9/1440 = 0.63%
                paddingRight: 'clamp(6px, 0.63vw, 9px)'
              }}
            >
              <span 
                className="text-studio-orange font-proxima-wide font-bold uppercase text-center leading-tight whitespace-nowrap"
                style={{
                  fontSize: 'clamp(7px, 0.69vw, 10px)',
                  letterSpacing: '0.02em',
                  transform: getTextRotation(project.side)
                }}
              >
                {project.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkGallery;