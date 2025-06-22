import React, { useRef, useState } from 'react';
import Layout from '../components/Layout';
import WorkGallery from '../components/WorkGallery';
import WorkBanners from '../components/WorkBanners';
import WorkFilterNav from '../components/WorkFilterNav';
import PageBanner from '../components/common/PageBanner';

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
    <Layout 
      title="Studio Pickens - Our Work"
      description="Explore Studio Pickens portfolio of creative work across film, television, theater, concerts, and editorial projects. Premium creative solutions with innovative storytelling."
    >
      {/* Work Page Banner */}
      <PageBanner 
        backgroundImage="work/Hero Banner Grouped.png"
        altText="Work banner background"
        objectFit="cover"
        height="clamp(500px, 60vw, 900px)"
      >
        {/* Center Content */}
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center max-w-2xl mx-auto px-4">
            <div className="md:bg-transparent bg-studio-bg md:p-0 p-6 md:w-auto w-[400px] mx-auto">
              <h1 className="font-proxima-wide font-bold text-studio-blue uppercase mb-6 text-center md:text-[64px] text-[40px]" style={{ lineHeight: '1.1' }}>
                Selected<br />Work
              </h1>
              <p className="font-proxima text-studio-blue max-w-lg" style={{ fontSize: '16px', lineHeight: '1.4' }}>
                Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus.
              </p>
            </div>
          </div>
        </div>
      </PageBanner>

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