import { useState, useEffect } from 'react';
import { API_ENDPOINTS, apiGet } from '../config/api';

export const useLocationsData = () => {
  const [locationsData, setLocationsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationsData = async () => {
      try {
        const data = await apiGet(API_ENDPOINTS.locations);
        setLocationsData(data);
      } catch (error) {
        console.error('Error fetching locations data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationsData();
  }, []);

  return { locationsData, loading, error };
};