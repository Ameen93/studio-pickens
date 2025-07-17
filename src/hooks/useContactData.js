import { useState, useEffect } from 'react';
import { API_ENDPOINTS, apiGet } from '../config/api';

export const useContactData = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const data = await apiGet(API_ENDPOINTS.contact);
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