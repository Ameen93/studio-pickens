import React from 'react';

const WorkBanners = ({ onBannerClick }) => {
  const banners = [
    {
      id: 1,
      src: `${process.env.PUBLIC_URL}/images/work/filmandtvbanner.jpg`,
      alt: 'Film & TV Banner',
      category: 'FILM & TV'
    },
    {
      id: 2,
      src: `${process.env.PUBLIC_URL}/images/work/musicbanner.png`,
      alt: 'Music Banner',
      category: 'MUSIC'
    },
    {
      id: 3,
      src: `${process.env.PUBLIC_URL}/images/work/theatrebanner.jpg`,
      alt: 'Theater Banner',
      category: 'THEATER'
    },
    {
      id: 4,
      src: `${process.env.PUBLIC_URL}/images/work/editorialbanner.jpg`,
      alt: 'Editorial Banner',
      category: 'EDITORIAL'
    }
  ];

  return (
    <section className="bg-studio-bg pt-16 relative w-full">
      {banners.map((banner) => (
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
              src={banner.src}
              alt={banner.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{
                objectPosition: banner.category === 'THEATER' ? 'center top' : 'center center'
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
                  {banner.category}
                </h2>
              </div>
            </div>
        </div>
      ))}
    </section>
  );
};

export default WorkBanners;