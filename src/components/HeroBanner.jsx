import React from 'react';
import { HERO_IMAGES, LOGO_IMAGES } from '../constants';
import { useCarousel } from '../hooks';

const HeroBanner = () => {
  const images = HERO_IMAGES;
  const { 
    currentIndex: currentSlide, 
    goToNext: nextSlide, 
    goToPrevious: prevSlide, 
    goToSlide 
  } = useCarousel(images, { autoPlayInterval: 4000 });

  return (
    <section 
      className="relative bg-studio-bg overflow-hidden w-full" 
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
        <div className="text-center">
          {/* Desktop Logo */}
          <img
            src={LOGO_IMAGES.default}
            alt="Studio Pickens Logo"
            className="hidden xl:block"
            style={{
              width: 'clamp(112.5px, 13.33vw, 192px)',
              height: 'auto'
            }}
          />
          {/* Mobile Logo - White */}
          <img
            src={LOGO_IMAGES.white}
            alt="Studio Pickens Logo"
            className="block xl:hidden"
            style={{
              width: 'clamp(112.5px, 13.33vw, 192px)',
              height: 'auto'
            }}
          />
        </div>
      </div>

      {/* Polaroid Images */}
      {/* Polaroid 1 - Desktop */}
      <div 
        className="absolute z-30 hidden xl:block"
        style={{
          top: 'clamp(10px, 1.39vw, 20px)',
          left: 'clamp(10px, 1.39vw, 20px)',
          width: 'clamp(88.5px, 12.34vw, 177.61px)',
          height: 'clamp(133px, 18.5vw, 266.48px)',
          transform: 'rotate(80deg)',
        }}
      >
        <img
          src="/images/hero/polaroid1.png"
          alt="Behind the scenes"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Polaroid 1 - Mobile - Top Left */}
      <div 
        className="absolute z-30 block xl:hidden"
        style={{
          top: 'clamp(10px, 2.78vw, 20px)',
          left: 'clamp(10px, 2.78vw, 20px)',
          width: 'clamp(86px, 24vw, 172.76px)',
          height: 'clamp(129px, 36vw, 259.21px)',
          transform: 'rotate(71.69deg)',
        }}
      >
        <img
          src="/images/hero/polaroid1.png"
          alt="Behind the scenes"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Polaroid 2 - Desktop */}
      <div 
        className="absolute z-40 hidden xl:block"
        style={{
          bottom: 'clamp(-100px, -13.89vw, -200px)',
          left: '50%',
          transform: 'translateX(-50%) rotate(-8.33deg)',
          width: 'clamp(88.5px, 12.34vw, 177.61px)',
          height: 'clamp(133px, 18.5vw, 266.48px)',
        }}
      >
        <img
          src="/images/hero/polaroid2.png"
          alt="Creative process"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Polaroid 2 - Mobile - Middle Right */}
      <div 
        className="absolute z-40 block xl:hidden"
        style={{
          top: '50%',
          right: 'clamp(-10px, -2.78vw, -20px)',
          transform: 'translateY(-50%) rotate(-8.33deg)',
          width: 'clamp(86px, 23.89vw, 171.97px)',
          height: 'clamp(129px, 35.84vw, 258.02px)',
        }}
      >
        <img
          src="/images/hero/polaroid2.png"
          alt="Creative process"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Polaroid 3 - Desktop */}
      <div 
        className="absolute z-40 hidden xl:block"
        style={{
          bottom: 'clamp(40px, 5.56vw, 80px)',
          right: 'clamp(-20px, -2.78vw, -40px)',
          width: 'clamp(88.5px, 12.34vw, 177.61px)',
          height: 'clamp(133px, 18.5vw, 266.48px)',
          transform: 'rotate(100deg)',
        }}
      >
        <img
          src="/images/hero/polaroid3.png"
          alt="Studio work"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Polaroid 3 - Mobile - Bottom Center */}
      <div 
        className="absolute z-40 block xl:hidden"
        style={{
          bottom: 'clamp(-30px, -8.33vw, -60px)',
          left: '50%',
          transform: 'translateX(-50%) rotate(100.46deg)',
          width: 'clamp(80px, 22.31vw, 160.65px)',
          height: 'clamp(120px, 33.48vw, 241.03px)',
        }}
      >
        <img
          src="/images/hero/polaroid3.png"
          alt="Studio work"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroBanner;