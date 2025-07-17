import React, { useMemo } from 'react';
import { WORK_PROJECTS } from '../constants';
import WorkItem from './common/WorkItem';
import MobileWorkItem from './common/MobileWorkItem';

const WorkGallery = React.memo(({ filter = 'ALL MEDIA', onCategoryClick, projects = WORK_PROJECTS }) => {
  // Memoize filter mapping to avoid recreation on each render
  const filterMap = useMemo(() => ({
    'FILM & TV': 'FILM & TV',
    'THEATER': 'THEATER',
    'CONCERT': 'CONCERT',
    'EDITORIAL': 'EDITORIAL',
    'MUSIC VIDEO': 'MUSIC VIDEO',
    'LIVE PERFORMANCE': 'LIVE'
  }), []);

  // Memoize filtered projects calculation
  const rawFilteredProjects = useMemo(() => {
    return filter === 'ALL MEDIA' 
      ? projects 
      : projects.filter(project => {
          return project.category === filterMap[filter] || project.category === filter;
        });
  }, [filter, filterMap, projects]);

  // Memoize position calculations to avoid expensive recalculations
  const filteredProjects = useMemo(() => {
    // Enhanced layout pattern with proper centering for center-positioned projects
    const positions = [
      { left: 50, side: 'left' },
      { left: 750, side: 'right' },
      { left: 390, side: 'center' }
    ];
    
    const projectsToPosition = filter === 'ALL MEDIA' ? projects : rawFilteredProjects;
    
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
    
    const minHeight = Math.max((filteredProjects.length - 1) * 425 + 200, 400);
    const vwHeight = (filteredProjects.length - 1) * 29.51 + 20;
    const maxHeight = (filteredProjects.length - 1) * 425 + 300;
    
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

  // Project content data with custom labels
  const projectContent = {
    1: { 
      title: 'THE BEAR', 
      stylist: 'ally vickers', 
      photographer: 'jamie lee curtis', 
      date: 'hulu',
      labels: { stylist: 'HAIR STYLIST', photographer: 'CAST', date: 'NETWORK' }
    },
    2: { 
      title: 'HERE WE ARE', 
      stylist: 'Katie Gell', 
      photographer: 'Jane krakowski. Jesse Tyler Ferguson. Martha plimpton', 
      date: 'west end plays',
      labels: { stylist: 'HAIR DESIGNER', photographer: 'FEATURING', date: 'CATEGORY' }
    },
    3: { 
      title: 'L\'OFFICIEL', 
      stylist: 'adir abergel', 
      photographer: 'nicole kidman', 
      date: 'april 2024',
      labels: { stylist: 'HAIRDRESSER', photographer: 'ACTRESS', date: 'ISSUE' }
    },
    4: { 
      title: 'THE FIRST LADY', 
      stylist: 'emmie america', 
      photographer: 'Michelle Pfeiffer, Dakota fanning', 
      date: 'showtime',
      labels: { stylist: 'HAIRDRESSER', photographer: 'ACTRESS', date: 'NETWORK' }
    },
    5: { 
      title: 'LOEWE', 
      stylist: 'michelle ceglia', 
      photographer: 'dan levy, aubrey plaza', 
      date: 'march 2024',
      labels: { stylist: 'HAIR DESIGNER', photographer: 'ACTOR/ACTRESS', date: 'ISSUE' }
    },
    6: { 
      title: 'THE WHALE', 
      stylist: 'annemarie bradley', 
      photographer: 'brendan fraser', 
      date: '2022',
      labels: { stylist: 'HAIR DESIGNER', photographer: 'CAST', date: 'DATE' }
    }
  };

  return (
    <section className="bg-studio-bg py-12 relative w-full overflow-visible">
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
              content={project.content || projectContent[project.id]}
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
            content={project.content || projectContent[project.id]}
            onCategoryClick={onCategoryClick}
          />
        ))}
      </div>
    </section>
  );
});

WorkGallery.displayName = 'WorkGallery';

export default WorkGallery;