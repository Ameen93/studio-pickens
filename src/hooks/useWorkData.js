import { useState, useEffect } from 'react';

export const useWorkData = () => {
  const [workData, setWorkData] = useState({
    banner: {
      desktopImage: '/images/work/Desktop_WORK Hero Banner v2.png',
      mobileImage: '/images/work/Mobile_WORK Hero Banner v2.png',
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkData = async () => {
      try {
        const response = await fetch('/data/work.json');
        const data = await response.json();
        
        // Ensure we have the required structure
        setWorkData({
          banner: {
            ...data.banner,
            transform: data.banner.transform || {
              scale: 1,
              translateX: 0,
              translateY: 0,
              objectPosition: 'center center'
            }
          },
          sectionBanners: data.sectionBanners || [],
          projects: data.projects || []
        });
      } catch (error) {
        console.error('Error fetching work data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkData();
  }, []);

  const featuredProjects = workData.projects?.filter(project => project.featured) || [];
  
  return { workData, featuredProjects, loading, error };
};