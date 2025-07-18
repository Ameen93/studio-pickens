import React, { useState, useEffect } from 'react';
import { HERO_IMAGES, LOGO_IMAGES } from '../constants';
import { useCarousel, useHeroData } from '../hooks';
import HeroCarousel from './sections/HeroCarousel';
import Polaroid from './common/Polaroid';

const HeroBanner = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { heroData, loading: heroLoading, error: heroError } = useHeroData();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollProgress = Math.min(Math.max(scrollY - 80, 0) / 80, 1);
  const images = heroData.backgroundImages?.map(bg => bg.image) || HERO_IMAGES;
  const { 
    currentIndex: currentSlide, 
    goToNext: nextSlide, 
    goToPrevious: prevSlide, 
    goToSlide 
  } = useCarousel(images, { autoPlayInterval: 4000 });

  // Generate polaroid configurations from heroData
  const polaroidConfigs = heroData.polaroids?.map((polaroid, index) => {
    // Default configurations for each polaroid position
    const defaultConfigs = [
      {
        animationDuration: 3800,
        initialOffset: { x: -60, y: 20 },
        zIndex: 30,
        size: {
          width: 'clamp(88.5px, 12.34vw, 177.61px)',
          height: 'clamp(133px, 18.5vw, 266.48px)'
        },
        className: "hidden md:block",
        mobileConfig: {
          size: {
            width: 'clamp(129px, 36vw, 259.14px)',
            height: 'clamp(193.5px, 54vw, 388.82px)'
          },
          position: {
            top: 'clamp(10px, 2.78vw, 20px)',
            left: '-30px'
          },
          rotation: 18.31,
          animationDuration: 3500,
          initialOffset: { x: -40, y: -30 },
          className: "block md:hidden"
        }
      },
      {
        animationDuration: 3000,
        initialOffset: { x: -15, y: 100 },
        zIndex: 50,
        size: {
          width: 'clamp(88.5px, 12.34vw, 177.61px)',
          height: 'clamp(133px, 18.5vw, 266.48px)'
        },
        className: "hidden md:block",
        mobileConfig: {
          size: {
            width: 'clamp(129px, 35.84vw, 257.96px)',
            height: 'clamp(193.5px, 53.76vw, 387.03px)'
          },
          position: {
            top: '77.5%',
            left: '30%'
          },
          rotation: 8.33,
          animationDuration: 3200,
          initialOffset: { x: 20, y: 30 },
          className: "block md:hidden"
        }
      },
      {
        animationDuration: 3800,
        initialOffset: { x: 60, y: 80 },
        zIndex: 40,
        size: {
          width: 'clamp(88.5px, 12.34vw, 177.61px)',
          height: 'clamp(133px, 18.5vw, 266.48px)'
        },
        className: "hidden md:block",
        mobileConfig: {
          size: {
            width: 'clamp(120px, 33.47vw, 240.98px)',
            height: 'clamp(180px, 50.22vw, 361.55px)'
          },
          position: {
            bottom: 'clamp(100px, 27.78vw, 200px)',
            right: '-22px'
          },
          rotation: -10.46,
          animationDuration: 3400,
          initialOffset: { x: 50, y: -35 },
          className: "block md:hidden"
        }
      }
    ];

    const config = defaultConfigs[index] || defaultConfigs[0];
    
    // Return both desktop and mobile configs
    return [
      {
        ...(polaroid.image?.startsWith('/images/polaroids/') 
          ? { filename: polaroid.image.replace('/images/polaroids/', '') }
          : { src: polaroid.image }
        ),
        alt: polaroid.alt,
        position: polaroid.position,
        size: config.size,
        rotation: polaroid.rotation,
        animationDuration: config.animationDuration,
        initialOffset: config.initialOffset,
        zIndex: config.zIndex,
        className: config.className
      },
      // Mobile version
      {
        ...(polaroid.image?.startsWith('/images/polaroids/') 
          ? { filename: polaroid.image.replace('/images/polaroids/', '') }
          : { src: polaroid.image }
        ),
        alt: polaroid.alt,
        position: config.mobileConfig.position,
        size: config.mobileConfig.size,
        rotation: config.mobileConfig.rotation,
        animationDuration: config.mobileConfig.animationDuration,
        initialOffset: config.mobileConfig.initialOffset,
        zIndex: config.zIndex,
        className: config.mobileConfig.className
      }
    ];
  }).flat() || [];

  return (
    <section 
      className="relative bg-studio-bg overflow-visible w-full z-10" 
      style={{ 
        height: `clamp(${heroData.bannerHeight?.min || 600}px, ${heroData.bannerHeight?.preferred || 70}vw, ${heroData.bannerHeight?.max || 1000}px)` 
      }}
    >
      {/* Desktop Background Images */}
      <div className="absolute inset-0 hidden md:flex">
        {heroData.backgroundImages?.map((bgImage, index) => (
          <div key={index} className="w-1/2 h-full relative overflow-hidden">
            <img
              src={bgImage.image}
              alt={bgImage.alt}
              className="w-full h-full object-cover transition-transform duration-300 ease-out"
              style={{
                transform: `scale(${bgImage.transform?.scale || 1}) 
                           translateX(${bgImage.transform?.translateX || 0}px) 
                           translateY(${bgImage.transform?.translateY || 0}px) 
                           ${bgImage.transform?.flip ? 'scaleX(-1)' : ''}`,
                transformOrigin: index === 0 ? 'center left' : 'center right',
                objectPosition: bgImage.transform?.objectPosition || 'center center'
              }}
            />
          </div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <HeroCarousel 
        images={images}
        currentSlide={currentSlide}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        goToSlide={goToSlide}
      />

      {/* Center Logo */}
      <div className="absolute inset-0 flex justify-center z-20" style={{ alignItems: 'center', paddingTop: 'clamp(180px, 35vw, 0px)' }}>
        <div className="text-center transform translate-y-0">
          <img
            src={LOGO_IMAGES.white}
            alt="Studio Pickens Logo"
            className="hidden md:block mx-auto mb-4 transition-all duration-1000 ease-out"
            style={{
              width: 'clamp(90px, 10.5vw, 150px)',
              height: 'auto',
              opacity: isLoaded ? 1 : 0,
              transform: `translateY(${isLoaded ? 0 : 30}px) scale(${isLoaded ? (heroData.banner?.logoSize?.scale || 1) : 0.8})`
            }}
          />
          <img
            src={LOGO_IMAGES.white}
            alt="Studio Pickens Logo"
            className="block md:hidden mx-auto mb-4 transition-all duration-1000 ease-out"
            style={{
              width: 'clamp(90px, 10.5vw, 150px)',
              height: 'auto',
              opacity: isLoaded ? 1 : 0,
              transform: `translateY(${isLoaded ? 0 : 30}px) scale(${isLoaded ? (heroData.banner?.logoSize?.scale || 1) : 0.8})`
            }}
          />
          <h1 
            className="hidden md:block font-proxima-wide font-semibold text-white uppercase text-center whitespace-nowrap transition-all duration-1000 ease-out"
            style={{
              fontSize: `${(50 - scrollProgress * 25) * (heroData.banner?.titleSize?.scale || 1)}px`,
              opacity: isLoaded ? Math.max(1 - scrollProgress * 1.67, 0) : 0,
              transform: `translateY(${isLoaded ? (scrollProgress * -120) : 40}px) translateX(${scrollProgress * 0}px) scale(${isLoaded ? (1 - scrollProgress * 0.3) : 0.8})`
            }}
          >
            {heroData.title || "STUDIO PICKENS"}
          </h1>
        </div>
      </div>

      {/* Polaroid Images */}
      {polaroidConfigs.map((config, index) => (
        <Polaroid
          key={index}
          filename={config.filename}
          src={config.src}
          alt={config.alt}
          isLoaded={isLoaded}
          position={config.position}
          size={config.size}
          rotation={config.rotation}
          animationDuration={config.animationDuration}
          initialOffset={config.initialOffset}
          zIndex={config.zIndex}
          className={config.className}
        />
      ))}
    </section>
  );
};

export default HeroBanner;