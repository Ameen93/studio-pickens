import { useState, useEffect } from 'react';
import { API_ENDPOINTS, apiGet } from '../config/api';

export const useStoryData = () => {
  const [storyData, setStoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const data = await apiGet(API_ENDPOINTS.story);
        setStoryData(data);
      } catch (error) {
        console.error('Error fetching story data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStoryData();
  }, []);

  return { storyData, loading, error };
};