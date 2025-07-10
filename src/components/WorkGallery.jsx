import React, { useMemo } from 'react';
import { WORK_PROJECTS } from '../constants';
import WorkItem from './common/WorkItem';
import MobileWorkItem from './common/MobileWorkItem';

const WorkGallery = React.memo(({ filter = 'ALL MEDIA', onCategoryClick }) => {
  // Memoize filter mapping to avoid recreation on each render
  const filterMap = useMemo(() => ({
    'FILM & TV': 'FILM & TV',
    'THEATER': 'THEATRE',
    'CONCERT': 'CONCERT',
    'EDITORIAL': 'EDITORIAL',
    'MUSIC VIDEO': 'MUSIC VIDEO',
    'LIVE PERFORMANCE': 'LIVE'
  }), []);

  // Memoize filtered projects calculation
  const rawFilteredProjects = useMemo(() => {
    return filter === 'ALL MEDIA' 
      ? WORK_PROJECTS 
      : WORK_PROJECTS.filter(project => {
          return project.category === filterMap[filter] || project.category === filter;
        });
  }, [filter, filterMap]);

  // Memoize position calculations to avoid expensive recalculations
  const filteredProjects = useMemo(() => {
    // Enhanced layout pattern with proper centering for center-positioned projects
    const positions = [
      { left: 50, side: 'left' },
      { left: 750, side: 'right' },
      { left: 390, side: 'center' }
    ];
    
    const projectsToPosition = filter === 'ALL MEDIA' ? WORK_PROJECTS : rawFilteredProjects;
    
    return projectsToPosition.map((project, index) => {
      // Use original side from project data for better layout control
      let positionIndex;
      if (project.side === 'center') {
        positionIndex = 2;
      } else if (project.side === 'left') {
        positionIndex = 0;
      } else {
        positionIndex = 1;
      }
      
      const position = positions[positionIndex];
      const top = index * 425;
      
      return {
        ...project,
        left: position.left,
        top: top,
        side: project.side || position.side
      };
    });
  }, [filter, rawFilteredProjects]);

  // Memoize gallery height calculation
  const galleryHeight = useMemo(() => {
    if (filteredProjects.length === 0) {
      return 'clamp(600px, 45vw, 600px)';
    }
    
    const minHeight = Math.max((filteredProjects.length - 1) * 425 + 400, 600);
    const vwHeight = (filteredProjects.length - 1) * 29.51 + 30;
    const maxHeight = (filteredProjects.length - 1) * 425 + 600;
    
    return `clamp(${minHeight}px, ${vwHeight}vw, ${maxHeight}px)`;
  }, [filteredProjects.length]);

  // Utility functions for positioning
  const getCirclePosition = (side) => {
    if (side === 'left') return '-left-12';
    if (side === 'right') return '-right-12';
    if (side === 'center') return '-left-12';
    return '-left-12';
  };

  const getTextRotation = (side) => {
    if (side === 'left') return 'rotate(-25deg)';
    if (side === 'right') return 'rotate(25deg)';
    if (side === 'center') return 'rotate(0deg)';
    return 'rotate(-25deg)';
  };

  const getTextHoverRotation = (side) => {
    if (side === 'left') return 'group-hover:rotate(-35deg)';
    if (side === 'right') return 'group-hover:rotate(35deg)';
    if (side === 'center') return 'group-hover:rotate(0deg)';
    return 'group-hover:rotate(-35deg)';
  };

  const getContentPosition = (side) => {
    if (side === 'left') return 'left-full';
    if (side === 'right') return 'right-full';
    if (side === 'center') return 'left-full';
    return 'left-full';
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
    <section className="bg-studio-bg pt-16 md:pt-4 pb-0 relative w-full overflow-visible">
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
              getContentPosition={getContentPosition}
              onCategoryClick={onCategoryClick}
            />
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden px-4">
        {filteredProjects.map((project) => (
          <MobileWorkItem 
            key={project.id}
            project={project}
            content={projectContent[project.id]}
            onCategoryClick={onCategoryClick}
          />
        ))}
      </div>
    </section>
  );
});

WorkGallery.displayName = 'WorkGallery';

export default WorkGallery;