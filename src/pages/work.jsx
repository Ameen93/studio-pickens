import React, { useRef, useState } from 'react';
import Layout from '../components/Layout';
import WorkGallery from '../components/WorkGallery';
import WorkBanners from '../components/WorkBanners';
import WorkFilterNav from '../components/WorkFilterNav';

const WorkPage = () => {
  const galleryRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('ALL MEDIA');

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

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <Layout title="Studio Pickens - Our Work">
      {/* Work Page Banner */}
      <section 
        className="relative bg-studio-bg flex items-center justify-center w-full overflow-hidden" 
        style={{ 
          height: 'clamp(400px, 45vw, 800px)',
        }}
      >
        {/* Center Content */}
        <div className="text-center max-w-2xl mx-auto px-4 z-10">
          <div className="md:bg-transparent bg-studio-bg md:p-0 p-6 md:w-auto w-[270px] mx-auto">
            <h1 className="text-h1-mobile md:text-h1 font-proxima-wide font-bold text-studio-blue uppercase mb-6">
              Selected Work
            </h1>
            <p className="text-body-mobile md:text-body font-proxima text-studio-blue">
              Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus. Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec.
            </p>
          </div>
        </div>
      </section>

      {/* Work Filter Navigation */}
      <WorkFilterNav 
        onFilterChange={handleFilterChange}
        activeFilter={activeFilter}
      />

      {/* Work Gallery */}
      <div ref={galleryRef}>
        <WorkGallery filter={activeFilter} />
      </div>
      
      {/* Work Banners */}
      <WorkBanners onBannerClick={handleBannerClick} />
    </Layout>
  );
};

export default WorkPage;