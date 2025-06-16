import React, { useState, useEffect } from 'react';
import { HERO_IMAGES, LOGO_IMAGES } from '../constants';
import { useCarousel } from '../hooks';

const HeroBanner = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Trigger animation on component mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate scroll progress for smooth animations
  const scrollProgress = Math.min(Math.max(scrollY - 80, 0) / 80, 1); // Progress from 80px to 160px
  const images = HERO_IMAGES;
  const { 
    currentIndex: currentSlide, 
    goToNext: nextSlide, 
    goToPrevious: prevSlide, 
    goToSlide 
  } = useCarousel(images, { autoPlayInterval: 4000 });

  return (
    <section 
      className="relative bg-studio-bg overflow-visible w-full z-10" 
      style={{ 
        height: 'clamp(400px, 45vw, 800px)',
      }}
    >
      {/* Desktop Background Images */}
      <div className="absolute inset-0 hidden xl:flex">
        {/* Left Background - Mirrored */}
        <div className="w-1/2 h-full relative">
          <img
            src={HERO_IMAGES[0]}
            alt="Studio Background"
            className="w-full h-full object-cover transform scale-x-[-1]"
          />
        </div>
        
        {/* Right Background */}
        <div className="w-1/2 h-full relative">
          <img
            src={HERO_IMAGES[1]}
            alt="Studio Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="absolute inset-0 xl:hidden">
        <div className="relative w-full h-full overflow-hidden">
          {/* Carousel Images */}
          <div 
            className="flex w-full h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full h-full flex-shrink-0 relative">
                <img
                  src={image}
                  alt={`Studio Background ${index + 1}`}
                  className={`w-full h-full object-cover ${index === 0 ? 'transform scale-x-[-1]' : ''}`}
                />
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm text-studio-blue p-2 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm text-studio-blue p-2 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-studio-blue' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Center Logo */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center transform -translate-y-12">
          {/* Desktop Logo */}
          <img
            src={LOGO_IMAGES.default}
            alt="Studio Pickens Logo"
            className="hidden xl:block mx-auto mb-4"
            style={{
              width: 'clamp(112.5px, 13.33vw, 192px)',
              height: 'auto'
            }}
          />
          {/* Mobile Logo - White */}
          <img
            src={LOGO_IMAGES.white}
            alt="Studio Pickens Logo"
            className="block xl:hidden mx-auto mb-4"
            style={{
              width: 'clamp(112.5px, 13.33vw, 192px)',
              height: 'auto'
            }}
          />
          {/* Studio Pickens Text */}
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
      {/* Polaroid 1 - Desktop */}
      <div 
        className="absolute z-[100] hidden xl:block transition-all duration-[2400ms] ease-out"
        style={{
          top: isLoaded ? 'clamp(10px, 1.39vw, 20px)' : '50%',
          left: isLoaded ? 'clamp(10px, 1.39vw, 20px)' : '50%',
          width: 'clamp(88.5px, 12.34vw, 177.61px)',
          height: 'clamp(133px, 18.5vw, 266.48px)',
          transform: `${isLoaded ? '' : 'translate(-50%, -50%)'} rotate(${isLoaded ? 80 : 0}deg) scale(${isLoaded ? 1 : 2})`,
          transformOrigin: 'center center',
        }}
      >
        <img
          src="/images/polaroids/polaroid1.png"
          alt="Behind the scenes"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Polaroid 1 - Mobile - Top Left */}
      <div 
        className="absolute z-[100] block xl:hidden transition-all duration-[2400ms] ease-out"
        style={{
          top: isLoaded ? 'clamp(10px, 2.78vw, 20px)' : '50%',
          left: isLoaded ? 'clamp(10px, 2.78vw, 20px)' : '50%',
          width: 'clamp(86px, 24vw, 172.76px)',
          height: 'clamp(129px, 36vw, 259.21px)',
          transform: `${isLoaded ? '' : 'translate(-50%, -50%)'} rotate(${isLoaded ? 71.69 : 0}deg) scale(${isLoaded ? 1 : 2})`,
          transformOrigin: 'center center',
        }}
      >
        <img
          src="/images/polaroids/polaroid1.png"
          alt="Behind the scenes"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Polaroid 2 - Desktop */}
      <div 
        className="absolute z-40 hidden xl:block transition-all duration-[2400ms] ease-out"
        style={{
          top: isLoaded ? 'auto' : '50%',
          bottom: isLoaded ? 'clamp(-100px, -13.89vw, -200px)' : 'auto',
          left: '50%',
          width: 'clamp(88.5px, 12.34vw, 177.61px)',
          height: 'clamp(133px, 18.5vw, 266.48px)',
          transform: `translate(-50%, ${isLoaded ? '0' : '-50%'}) rotate(${isLoaded ? -8.33 : 0}deg) scale(${isLoaded ? 1 : 2})`,
          transformOrigin: 'center center',
        }}
      >
        <img
          src="/images/polaroids/polaroid2.png"
          alt="Creative process"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Polaroid 2 - Mobile - Middle Right */}
      <div 
        className="absolute z-40 block xl:hidden transition-all duration-[2400ms] ease-out"
        style={{
          top: '50%',
          right: isLoaded ? 'clamp(-10px, -2.78vw, -20px)' : '50%',
          left: isLoaded ? 'auto' : '50%',
          width: 'clamp(86px, 23.89vw, 171.97px)',
          height: 'clamp(129px, 35.84vw, 258.02px)',
          transform: `translate(${isLoaded ? '0, -50%' : '-50%, -50%'}) rotate(${isLoaded ? -8.33 : 0}deg) scale(${isLoaded ? 1 : 2})`,
          transformOrigin: 'center center',
        }}
      >
        <img
          src="/images/polaroids/polaroid2.png"
          alt="Creative process"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Polaroid 3 - Desktop */}
      <div 
        className="absolute z-40 hidden xl:block transition-all duration-[2400ms] ease-out"
        style={{
          top: isLoaded ? 'auto' : '50%',
          bottom: isLoaded ? 'clamp(40px, 5.56vw, 80px)' : 'auto',
          right: isLoaded ? 'clamp(20px, 2.78vw, 40px)' : '50%',
          left: isLoaded ? 'auto' : '50%',
          width: 'clamp(88.5px, 12.34vw, 177.61px)',
          height: 'clamp(133px, 18.5vw, 266.48px)',
          transform: `translate(${isLoaded ? '0, 0' : '-50%, -50%'}) rotate(${isLoaded ? 100 : 0}deg) scale(${isLoaded ? 1 : 2})`,
          transformOrigin: 'center center',
        }}
      >
        <img
          src="/images/polaroids/polaroid3.png"
          alt="Studio work"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Polaroid 3 - Mobile - Bottom Center */}
      <div 
        className="absolute z-40 block xl:hidden transition-all duration-[2400ms] ease-out"
        style={{
          top: isLoaded ? 'auto' : '50%',
          bottom: isLoaded ? 'clamp(-30px, -8.33vw, -60px)' : 'auto',
          left: '50%',
          width: 'clamp(80px, 22.31vw, 160.65px)',
          height: 'clamp(120px, 33.48vw, 241.03px)',
          transform: `translate(-50%, ${isLoaded ? '0' : '-50%'}) rotate(${isLoaded ? 100.46 : 0}deg) scale(${isLoaded ? 1 : 2})`,
          transformOrigin: 'center center',
        }}
      >
        <img
          src="/images/polaroids/polaroid3.png"
          alt="Studio work"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroBanner;