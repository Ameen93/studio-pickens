import { useState, useEffect } from 'react';
import { API_ENDPOINTS, apiGet } from '../config/api';

export const useProcessData = () => {
  const [processData, setProcessData] = useState({
    banner: {
      backgroundImage: {
        desktop: '/images/process/banner/Desktop_PROCESS Hero Banner v2.png',
        mobile: '/images/process/banner/Mobile_Hero Banner_process.png'
      },
      title: 'Process',
      subtitle: '',
      transform: {
        scale: 1,
        translateX: 0,
        translateY: 0,
        objectPosition: 'center center'
      },
      circle: {
        size: {
          scale: 1
        }
      },
      heading: {
        size: {
          scale: 1
        }
      }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcessData = async () => {
      try {
        const data = await apiGet(API_ENDPOINTS.process);
        
        // Ensure we have the required structure
        setProcessData({
          banner: {
            ...data.banner,
            transform: data.banner.transform || {
              scale: 1,
              translateX: 0,
              translateY: 0,
              objectPosition: 'center center'
            },
            circle: data.banner.circle || {
              size: {
                scale: 1
              }
            },
            heading: data.banner.heading || {
              size: {
                scale: 1
              }
            }
          },
          processSteps: data.processSteps || []
        });
      } catch (err) {
        console.error('Error fetching process data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProcessData();
  }, []);

  return { processData, loading, error };
};