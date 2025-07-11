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
    // Polaroid 1 - Desktop (swapped to new-polaroid-2)
    {
      filename: "new-polaroid-2.png",
      alt: "Behind the scenes",
      position: {
        top: 'clamp(10px, 1.39vw, 20px)',
        left: 'clamp(10px, 1.39vw, 20px)'
      },
      size: {
        width: 'clamp(88.5px, 12.34vw, 177.61px)',
        height: 'clamp(133px, 18.5vw, 266.48px)'
      },
      rotation: 10,
      animationDuration: 3800,
      initialOffset: { x: -60, y: -40 },
      zIndex: 30,
      className: "hidden xl:block"
    },
    // Polaroid 1 - Mobile (swapped to new-polaroid-2)
    {
      filename: "new-polaroid-2.png",
      alt: "Behind the scenes",
      position: {
        top: 'clamp(10px, 2.78vw, 20px)',
        left: '-10px'
      },
      size: {
        width: 'clamp(86px, 24vw, 172.76px)',
        height: 'clamp(129px, 36vw, 259.21px)'
      },
      rotation: 18.31,
      animationDuration: 3500,
      initialOffset: { x: -40, y: -30 },
      zIndex: 30,
      className: "block xl:hidden"
    },
    // Polaroid 2 - Desktop (swapped to new-polaroid-1)
    {
      filename: "new-polaroid-1.png",
      alt: "Creative process",
      position: {
        bottom: 'clamp(-100px, -13.89vw, -200px)',
        left: '46%'
      },
      size: {
        width: 'clamp(88.5px, 12.34vw, 177.61px)',
        height: 'clamp(133px, 18.5vw, 266.48px)'
      },
      rotation: 8.33,
      animationDuration: 3000,
      initialOffset: { x: -15, y: 50 },
      zIndex: 50,
      className: "hidden xl:block"
    },
    // Polaroid 2 - Mobile (swapped to new-polaroid-1)
    {
      filename: "new-polaroid-1.png",
      alt: "Creative process",
      position: {
        bottom: 'clamp(100px, 27.78vw, 200px)',
        right: '-22px'
      },
      size: {
        width: 'clamp(86px, 23.89vw, 171.97px)',
        height: 'clamp(129px, 35.84vw, 258.02px)'
      },
      rotation: 8.33,
      animationDuration: 3200,
      initialOffset: { x: 20, y: 30 },
      zIndex: 50,
      className: "block xl:hidden"
    },
    // Polaroid 3 - Desktop
    {
      filename: "new-polaroid-3.png",
      alt: "Studio work",
      position: {
        bottom: 'clamp(40px, 5.56vw, 80px)',
        right: 'clamp(20px, 2.78vw, 40px)'
      },
      size: {
        width: 'clamp(88.5px, 12.34vw, 177.61px)',
        height: 'clamp(133px, 18.5vw, 266.48px)'
      },
      rotation: -10,
      animationDuration: 3600,
      initialOffset: { x: 80, y: -50 },
      zIndex: 40,
      className: "hidden xl:block"
    },
    // Polaroid 3 - Mobile
    {
      filename: "new-polaroid-3.png",
      alt: "Studio work",
      position: {
        top: '70%',
        left: '40%'
      },
      size: {
        width: 'clamp(80px, 22.31vw, 160.65px)',
        height: 'clamp(120px, 33.48vw, 241.03px)'
      },
      rotation: -10.46,
      animationDuration: 3400,
      initialOffset: { x: 50, y: -35 },
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
        <div className="w-1/2 h-full relative overflow-hidden">
          <img
            src={HERO_IMAGES[1]}
            alt="Behind the scenes view of Studio Pickens creative process and artistic environment"
            className="w-full h-full object-cover transform scale-125 translate-x-24 translate-y-16"
            style={{ transformOrigin: 'center right' }}
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
        <div className="text-center transform translate-y-0">
          <img
            src={LOGO_IMAGES.default}
            alt="Studio Pickens Logo"
            className="hidden xl:block mx-auto mb-4 transition-all duration-1000 ease-out"
            style={{
              width: 'clamp(90px, 10.5vw, 150px)',
              height: 'auto',
              opacity: isLoaded ? 1 : 0,
              transform: `translateY(${isLoaded ? 0 : 30}px) scale(${isLoaded ? 1 : 0.8})`
            }}
          />
          <img
            src={LOGO_IMAGES.white}
            alt="Studio Pickens Logo"
            className="block xl:hidden mx-auto mb-4 transition-all duration-1000 ease-out"
            style={{
              width: 'clamp(90px, 10.5vw, 150px)',
              height: 'auto',
              opacity: isLoaded ? 1 : 0,
              transform: `translateY(${isLoaded ? 0 : 30}px) scale(${isLoaded ? 1 : 0.8})`
            }}
          />
          <h1 
            className="hidden xl:block font-proxima-wide font-semibold text-studio-blue uppercase text-center whitespace-nowrap transition-all duration-1000 ease-out"
            style={{
              fontSize: `${50 - scrollProgress * 25}px`,
              opacity: isLoaded ? Math.max(1 - scrollProgress * 1.67, 0) : 0,
              transform: `translateY(${isLoaded ? (scrollProgress * -120) : 40}px) translateX(${scrollProgress * 0}px) scale(${isLoaded ? (1 - scrollProgress * 0.3) : 0.8})`
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