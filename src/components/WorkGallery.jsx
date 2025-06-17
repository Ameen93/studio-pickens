import React, { useState } from 'react';
import { WORK_PROJECTS } from '../constants';

// Mobile Work Item Component
const MobileWorkItem = ({ project, content }) => {
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
          src={project.src}
          alt={project.alt}
          className="w-full h-full object-cover rounded-lg shadow-lg"
          style={{
            objectPosition: project.src.includes('editorial2') || project.src.includes('editorial3') ? 'center top' : 'center center'
          }}
        />
        
        {/* Category Label Circle */}
        <div 
          className={`absolute bottom-8 w-24 h-24 rounded-full flex items-center justify-center transition-colors duration-300 ${
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
        </div>
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

const WorkGallery = ({ filter = 'ALL MEDIA' }) => {
  // Filter projects based on the selected filter
  const rawFilteredProjects = filter === 'ALL MEDIA' 
    ? WORK_PROJECTS 
    : WORK_PROJECTS.filter(project => {
        // Map filter names to project categories
        const filterMap = {
          'FILM & TV': 'FILM & TV',
          'THEATER': 'THEATRE',
          'CONCERT': 'CONCERT',
          'EDITORIAL': 'EDITORIAL',
          'MUSIC VIDEO': 'MUSIC VIDEO',
          'LIVE PERFORMANCE': 'LIVE'
        };
        return project.category === filterMap[filter] || project.category === filter;
      });

  // Reposition filtered projects using the original staggered layout pattern
  const filteredProjects = filter === 'ALL MEDIA' 
    ? WORK_PROJECTS 
    : rawFilteredProjects.map((project, index) => {
        // Original layout pattern: left(132), center(396), right(625) with 400px vertical spacing
        const positions = [
          { left: 132, side: 'left' },
          { left: 396, side: 'center' },
          { left: 625, side: 'right' }
        ];
        
        const positionIndex = index % 3;
        const position = positions[positionIndex];
        const top = index * 400;
        
        return {
          ...project,
          left: position.left,
          top: top,
          side: position.side
        };
      });

  // Calculate gallery height based on filtered projects
  const galleryHeight = filter === 'ALL MEDIA' 
    ? 'clamp(2400px, 250vw, 3636px)' // Original height
    : filteredProjects.length > 0 
      ? `clamp(${Math.max((filteredProjects.length - 1) * 400 + 600, 800)}px, ${(filteredProjects.length - 1) * 27.78 + 41.67}vw, ${(filteredProjects.length - 1) * 400 + 972}px)`
      : 'clamp(800px, 55.56vw, 800px)';

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

  const getTextHoverRotation = (side) => {
    // Add extra rotation on hover
    if (side === 'left') return 'group-hover:rotate(-35deg)';
    if (side === 'right') return 'group-hover:rotate(35deg)';
    return 'group-hover:rotate(-35deg)'; // center images use counter-clockwise
  };

  const getImageShift = (side) => {
    // Images shift so image + info card are centered together
    if (side === 'left') return '-translate-x-1/2'; // Left images shift left to center the pair
    if (side === 'right') return 'translate-x-1/2'; // Right images shift right to center the pair
    return '-translate-x-1/2'; // Center images shift left to center the pair
  };

  const getContentPosition = (side) => {
    // Content appears beside the shifted image to create centered layout
    if (side === 'left') return 'left-full ml-4'; // Content to the right of left images
    if (side === 'right') return 'right-full mr-4'; // Content to the left of right images
    return 'left-full ml-4'; // Center content to the right
  };

  // Dummy content data for each project
  const projectContent = {
    1: { title: 'VOGUE HONG KONG', stylist: 'jane smith', photographer: 'emmie america', date: '2025' },
    2: { title: 'HARPER\'S BAZAAR', stylist: 'alex johnson', photographer: 'david chen', date: '2024' },
    3: { title: 'VANITY FAIR', stylist: 'maria lopez', photographer: 'sarah kim', date: '2025' },
    4: { title: 'ELLE MAGAZINE', stylist: 'tom wilson', photographer: 'lisa park', date: '2024' },
    5: { title: 'W MAGAZINE', stylist: 'anna white', photographer: 'mike jones', date: '2024' },
    6: { title: 'MARIE CLAIRE', stylist: 'sara brown', photographer: 'chris lee', date: '2025' },
    7: { title: 'ALLURE', stylist: 'emma davis', photographer: 'ryan taylor', date: '2024' },
    8: { title: 'COSMOPOLITAN', stylist: 'lily wilson', photographer: 'jack martinez', date: '2025' },
    9: { title: 'GLAMOUR', stylist: 'zoe garcia', photographer: 'noah anderson', date: '2024' }
  };

  return (
    <section className="bg-studio-bg pt-16 pb-0 relative w-full overflow-visible">
      {/* Desktop Layout */}
      <div className="hidden md:block max-w-[1440px] mx-auto">
        <div 
          className="relative w-full"
          style={{ 
            height: galleryHeight
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
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
                className={`absolute top-0 ${getContentPosition(project.side)} bg-studio-bg p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`}
                style={{
                  width: 'clamp(300px, 45.83vw, 660px)',
                  height: 'clamp(169px, 25.83vw, 372px)',
                }}
              >
                {/* Title */}
                <h5 className="font-proxima-wide font-bold text-studio-blue text-xl uppercase tracking-wide mb-6">
                  {projectContent[project.id]?.title}
                </h5>

                {/* Stylist Section */}
                <div className="mb-4">
                  <h6 className="font-proxima-wide font-bold text-studio-blue text-sm uppercase tracking-wide mb-1">
                    STYLIST
                  </h6>
                  <p className="font-lovtony font-normal italic lowercase text-[40px] leading-[50%] text-studio-blue">
                    {projectContent[project.id]?.stylist}
                  </p>
                  <div className="w-full h-px border-b border-dotted border-studio-blue mt-2"></div>
                </div>

                {/* Photographer Section */}
                <div className="mb-4">
                  <h6 className="font-proxima-wide font-bold text-studio-blue text-sm uppercase tracking-wide mb-1">
                    PHOTOGRAPHER
                  </h6>
                  <p className="font-lovtony font-normal italic lowercase text-[40px] leading-[50%] text-studio-blue">
                    {projectContent[project.id]?.photographer}
                  </p>
                  <div className="w-full h-px border-b border-dotted border-studio-blue mt-2"></div>
                </div>

                {/* Date Section */}
                <div>
                  <h6 className="font-proxima-wide font-bold text-studio-blue text-sm uppercase tracking-wide mb-1">
                    DATE
                  </h6>
                  <p className="font-lovtony font-normal italic lowercase text-[40px] leading-[50%] text-studio-blue">
                    {projectContent[project.id]?.date}
                  </p>
                  <div className="w-full h-px border-b border-dotted border-studio-blue mt-2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden px-6">
        {filteredProjects.map((project) => (
          <MobileWorkItem 
            key={project.id}
            project={project}
            content={projectContent[project.id]}
          />
        ))}
      </div>
    </section>
  );
};

export default WorkGallery;