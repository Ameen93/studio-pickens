import React, { useRef } from 'react';
import Layout from '../components/Layout';
import WorkGallery from '../components/WorkGallery';
import WorkBanners from '../components/WorkBanners';

const WorkPage = () => {
  const galleryRef = useRef(null);

  const handleBannerClick = (category) => {
    // Scroll to the gallery section
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    // TODO: Filter gallery by category if needed
    // For now, just scroll to show the gallery
  };

  return (
    <Layout title="Studio Pickens - Our Work">
      {/* Work Gallery */}
      <div ref={galleryRef}>
        <WorkGallery />
      </div>
      
      {/* Work Banners */}
      <WorkBanners onBannerClick={handleBannerClick} />
    </Layout>
  );
};

export default WorkPage;