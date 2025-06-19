import React, { useState, useEffect } from 'react';
import { HERO_IMAGES, LOGO_IMAGES } from '../constants';
import { useCarousel } from '../hooks';
import HeroCarousel from './sections/HeroCarousel';
import Polaroid from './common/Polaroid';

const HeroBanner = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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
  const images = HERO_IMAGES;
  const { 
    currentIndex: currentSlide, 
    goToNext: nextSlide, 
    goToPrevious: prevSlide, 
    goToSlide 
  } = useCarousel(images, { autoPlayInterval: 4000 });

  const polaroidConfigs = [
    // Polaroid 1 - Desktop
    {
      filename: "polaroid1.png",
      alt: "Behind the scenes",
      position: {
        top: 'clamp(10px, 1.39vw, 20px)',
        left: 'clamp(10px, 1.39vw, 20px)'
      },
      size: {
        width: 'clamp(88.5px, 12.34vw, 177.61px)',
        height: 'clamp(133px, 18.5vw, 266.48px)'
      },
      rotation: 100,
      animationDuration: 3200,
      initialOffset: { x: -120, y: -80 },
      zIndex: 100,
      className: "hidden xl:block"
    },
    // Polaroid 1 - Mobile
    {
      filename: "polaroid1.png",
      alt: "Behind the scenes",
      position: {
        top: 'clamp(10px, 2.78vw, 20px)',
        left: 'clamp(10px, 2.78vw, 20px)'
      },
      size: {
        width: 'clamp(86px, 24vw, 172.76px)',
        height: 'clamp(129px, 36vw, 259.21px)'
      },
      rotation: 108.31,
      animationDuration: 2800,
      initialOffset: { x: -80, y: -60 },
      zIndex: 100,
      className: "block xl:hidden"
    },
    // Polaroid 2 - Desktop
    {
      filename: "polaroid2.png",
      alt: "Creative process",
      position: {
        bottom: 'clamp(-100px, -13.89vw, -200px)',
        left: '45%'
      },
      size: {
        width: 'clamp(88.5px, 12.34vw, 177.61px)',
        height: 'clamp(133px, 18.5vw, 266.48px)'
      },
      rotation: 8.33,
      animationDuration: 2000,
      initialOffset: { x: 0, y: 120 },
      zIndex: 40,
      className: "hidden xl:block"
    },
    // Polaroid 2 - Mobile
    {
      filename: "polaroid2.png",
      alt: "Creative process",
      position: {
        top: '50%',
        left: '40%'
      },
      size: {
        width: 'clamp(86px, 23.89vw, 171.97px)',
        height: 'clamp(129px, 35.84vw, 258.02px)'
      },
      rotation: 8.33,
      animationDuration: 2200,
      initialOffset: { x: 0, y: 80 },
      zIndex: 40,
      className: "block xl:hidden"
    },
    // Polaroid 3 - Desktop
    {
      filename: "polaroid3.png",
      alt: "Studio work",
      position: {
        bottom: 'clamp(40px, 5.56vw, 80px)',
        right: 'clamp(20px, 2.78vw, 40px)'
      },
      size: {
        width: 'clamp(88.5px, 12.34vw, 177.61px)',
        height: 'clamp(133px, 18.5vw, 266.48px)'
      },
      rotation: 80,
      animationDuration: 2800,
      initialOffset: { x: 130, y: -90 },
      zIndex: 40,
      className: "hidden xl:block"
    },
    // Polaroid 3 - Mobile
    {
      filename: "polaroid3.png",
      alt: "Studio work",
      position: {
        bottom: 'clamp(-30px, -8.33vw, -60px)',
        left: '50%'
      },
      size: {
        width: 'clamp(80px, 22.31vw, 160.65px)',
        height: 'clamp(120px, 33.48vw, 241.03px)'
      },
      rotation: 79.54,
      animationDuration: 2400,
      initialOffset: { x: 90, y: -70 },
      zIndex: 40,
      className: "block xl:hidden"
    }
  ];

  return (
    <section 
      className="relative bg-studio-bg overflow-visible w-full z-10" 
      style={{ height: 'clamp(400px, 45vw, 800px)' }}
    >
      {/* Desktop Background Images */}
      <div className="absolute inset-0 hidden xl:flex">
        <div className="w-1/2 h-full relative">
          <img
            src={HERO_IMAGES[0]}
            alt="Studio Pickens creative workspace showcasing film and television production equipment"
            className="w-full h-full object-cover transform scale-x-[-1]"
          />
        </div>
        <div className="w-1/2 h-full relative">
          <img
            src={HERO_IMAGES[1]}
            alt="Behind the scenes view of Studio Pickens creative process and artistic environment"
            className="w-full h-full object-cover"
          />
        </div>
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
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center transform -translate-y-12">
          <img
            src={LOGO_IMAGES.default}
            alt="Studio Pickens Logo"
            className="hidden xl:block mx-auto mb-4"
            style={{
              width: 'clamp(112.5px, 13.33vw, 192px)',
              height: 'auto'
            }}
          />
          <img
            src={LOGO_IMAGES.white}
            alt="Studio Pickens Logo"
            className="block xl:hidden mx-auto mb-4"
            style={{
              width: 'clamp(112.5px, 13.33vw, 192px)',
              height: 'auto'
            }}
          />
          <h1 
            className="text-nav-logo font-proxima-wide text-studio-blue uppercase text-center whitespace-nowrap transition-all duration-200 ease-out"
            style={{
              opacity: 1 - scrollProgress,
              transform: `translateY(${scrollProgress * -30}px) scale(${1 - scrollProgress * 0.05})`
            }}
          >
            STUDIO PICKENS
          </h1>
        </div>
      </div>

      {/* Polaroid Images */}
      {polaroidConfigs.map((config, index) => (
        <Polaroid
          key={index}
          filename={config.filename}
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