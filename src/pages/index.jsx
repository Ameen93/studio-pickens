import React, { useRef } from 'react';
import Layout from '../components/Layout';
import HeroBanner from '../components/HeroBanner';
import WorkGallery from '../components/WorkGallery';
import WorkBanners from '../components/WorkBanners';
import BragBar from '../components/BragBar';
import { Button } from '../components/ui';

const HomePage = () => {
  const galleryRef = useRef(null);

  // Map project categories to filter categories (same as work page)
  const categoryToFilterMap = {
    'FILM & TV': 'FILM & TV',
    'THEATRE': 'THEATER',
    'CONCERT': 'CONCERT',
    'EDITORIAL': 'EDITORIAL',
    'MUSIC VIDEO': 'MUSIC VIDEO',
    'LIVE': 'LIVE PERFORMANCE'
  };

  const handleBannerClick = (category) => {
    // Scroll to the gallery section
    if (galleryRef.current) {
      galleryRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleCategoryClick = (category) => {
    const filterCategory = categoryToFilterMap[category] || category;
    // Navigate to work page with the filter as URL parameter
    window.history.pushState({}, '', `/work?filter=${encodeURIComponent(filterCategory)}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <Layout title="Studio Pickens - Creative Excellence">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Atelier Wigs Section */}
      <section 
        className="relative flex items-center justify-center bg-nav-blue"
        style={{ 
          height: 'clamp(280px, 29.17vw, 420px)'
        }}
      >
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            <h2 
              className="text-atelier-heading-mobile md:text-h3 font-proxima-wide uppercase mb-6 md:whitespace-nowrap text-center text-studio-bg"
            >
              ATELIER WIGS BY ROBERT PICKENS
            </h2>
            
            <p 
              className="text-body md:text-body sm:text-atelier-body-mobile font-proxima mb-8 max-w-3xl text-center text-studio-bg"
            >
              Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus. Amet sed risus lacinia sed. Quis ultricies vestibulum eleifend dignissim auctor laoreet feugiat.
            </p>
            
            <Button 
              href="/atelier-wigs" 
              variant="link"
              className="text-button-link md:text-button-link sm:text-atelier-link-mobile font-proxima-semibold"
            >
              LEARN MORE
            </Button>
          </div>
        </div>
      </section>

      {/* Work Gallery */}
      <div ref={galleryRef}>
        <WorkGallery onCategoryClick={handleCategoryClick} />
      </div>

      {/* Work Banners */}
      <WorkBanners onBannerClick={handleBannerClick} />

      {/* Brag Bar */}
      <BragBar />

    </Layout>
  );
};

export default HomePage;