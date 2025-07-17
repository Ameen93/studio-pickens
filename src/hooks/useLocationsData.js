import { useState, useEffect } from 'react';
import { API_ENDPOINTS, apiRequest } from '../config/api';

export const useLocationsData = () => {
  const [locationsData, setLocationsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationsData = async () => {
      try {
        const response = await apiRequest(API_ENDPOINTS.locations);
        const data = response.data || response;
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