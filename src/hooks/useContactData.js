import { useState, useEffect } from 'react';
import { API_ENDPOINTS, apiRequest } from '../config/api';

export const useContactData = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await apiRequest(API_ENDPOINTS.contact);
        const data = response.data || response;
        setContactData(data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  return { contactData, loading, error };
};