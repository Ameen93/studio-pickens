import React, { useState, useEffect } from 'react';

const WorkBanners = ({ onBannerClick }) => {
  const [sectionBanners, setSectionBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/work');
        const result = await response.json();
        const data = result.data || result;
        setSectionBanners(data.sectionBanners || []);
      } catch (error) {
        console.error('Error fetching work data:', error);
        // Fallback to default banners if API fails
        setSectionBanners([
          {
            id: 1,
            image: '/images/work/filmandtvbanner.jpg',
            alt: 'Film & TV Banner',
            category: 'FILM & TV',
            title: 'FILM & TV',
            transform: {
              scale: 1,
              translateX: 0,
              translateY: 0,
              objectPosition: 'center center'
            }
          },
          {
            id: 2,
            image: '/images/work/musicbanner.png',
            alt: 'Music Banner',
            category: 'MUSIC',
            title: 'MUSIC',
            transform: {
              scale: 1,
              translateX: 0,
              translateY: 0,
              objectPosition: 'center center'
            }
          },
          {
            id: 3,
            image: '/images/work/theatrebanner.jpg',
            alt: 'Theater Banner',
            category: 'THEATER',
            title: 'THEATER',
            transform: {
              scale: 1,
              translateX: 0,
              translateY: 0,
              objectPosition: 'center top'
            }
          },
          {
            id: 4,
            image: '/images/work/editorialbanner.jpg',
            alt: 'Editorial Banner',
            category: 'EDITORIAL',
            title: 'EDITORIAL',
            transform: {
              scale: 1,
              translateX: 0,
              translateY: 0,
              objectPosition: 'center center'
            }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkData();
  }, []);

  if (loading) {
    return <div className="bg-studio-bg pt-16 relative w-full h-64">Loading...</div>;
  }

  return (
    <section className="bg-studio-bg pt-16 relative w-full">
      {sectionBanners.map((banner) => (
        <div
          key={banner.id}
          className="relative w-full group cursor-pointer overflow-hidden"
          onClick={() => onBannerClick && onBannerClick(banner.category)}
          style={{
            height: 'clamp(100px, 22.36vw, 322px)' // Half height on mobile, same on desktop
          }}
        >
            {/* Banner Image */}
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              style={{
                objectPosition: banner.transform?.objectPosition || 'center center',
                transform: `scale(${banner.transform?.scale || 1}) translateX(${banner.transform?.translateX || 0}px) translateY(${banner.transform?.translateY || 0}px)`
              }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/30" />
            
            {/* Category Text */}
            <div className="absolute inset-0 flex items-center">
              <div className="pl-16"> {/* Left padding for alignment */}
                <h2 
                  className="font-proxima-wide font-bold uppercase text-left text-studio-bg group-hover:text-studio-orange transition-colors duration-300"
                  style={{
                    fontSize: 'clamp(24px, 3.33vw, 48px)', // 48/1440 = 3.33%
                    lineHeight: '100%',
                    letterSpacing: '0.03em'
                  }}
                >
                  {banner.title}
                </h2>
              </div>
            </div>
        </div>
      ))}
    </section>
  );
};

export default WorkBanners;