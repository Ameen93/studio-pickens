import { useState, useEffect } from 'react';
import { API_ENDPOINTS, apiGet } from '../config/api';

export const useHeroData = () => {
  const [heroData, setHeroData] = useState({
    title: "STUDIO PICKENS",
    subtitle: "",
    atelierTitle: "ATELIER WIGS BY ROBERT PICKENS",
    atelierDescription: "Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus. Amet sed risus lacinia sed. Quis ultricies vestibulum eleifend dignissim auctor laoreet feugiat.",
    banner: {
      logoSize: { scale: 1, unit: "rem" },
      titleSize: { scale: 1, unit: "rem" }
    },
    backgroundImages: [],
    polaroids: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await apiGet(API_ENDPOINTS.hero);
        
        // Ensure we have the required structure
        setHeroData({
          ...data,
          banner: data.banner || {
            logoSize: { scale: 1, unit: "rem" },
            titleSize: { scale: 1, unit: "rem" }
          },
          backgroundImages: data.backgroundImages || [],
          polaroids: data.polaroids || []
        });
      } catch (err) {
        console.error('Error fetching hero data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  return { heroData, loading, error };
};