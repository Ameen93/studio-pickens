import React from 'react';
import { WORK_PROJECTS } from '../constants';
import WorkItem from './common/WorkItem';
import MobileWorkItem from './common/MobileWorkItem';

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

  // Utility functions for positioning
  const getCirclePosition = (side) => {
    if (side === 'left') return '-left-12';
    if (side === 'right') return '-right-12';
    return '-left-12';
  };

  const getTextRotation = (side) => {
    if (side === 'left') return 'rotate(-25deg)';
    if (side === 'right') return 'rotate(25deg)';
    return 'rotate(-25deg)';
  };

  const getTextHoverRotation = (side) => {
    if (side === 'left') return 'group-hover:rotate(-35deg)';
    if (side === 'right') return 'group-hover:rotate(35deg)';
    return 'group-hover:rotate(-35deg)';
  };

  const getImageShift = (side) => {
    if (side === 'left') return '-translate-x-1/2';
    if (side === 'right') return 'translate-x-1/2';
    return '-translate-x-1/2';
  };

  const getContentPosition = (side) => {
    if (side === 'left') return 'left-full ml-4';
    if (side === 'right') return 'right-full mr-4';
    return 'left-full ml-4';
  };

  // Project content data
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
          style={{ height: galleryHeight }}
        >
          {filteredProjects.map((project) => (
            <WorkItem
              key={project.id}
              project={project}
              content={projectContent[project.id]}
              getCirclePosition={getCirclePosition}
              getTextRotation={getTextRotation}
              getTextHoverRotation={getTextHoverRotation}
              getImageShift={getImageShift}
              getContentPosition={getContentPosition}
            />
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