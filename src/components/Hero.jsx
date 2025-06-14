import React from 'react';

const Hero = ({ 
  imageSrc = '/images/hero/hero-main.jpg', 
  imageAlt = 'Studio Pickens Hero Image',
  headline = 'CREATIVE EXCELLENCE',
  subheadline = 'CRAFTING MEMORABLE EXPERIENCES',
  description = 'Studio Pickens delivers premium creative solutions for film, television, music, and theater. Our team brings visionary concepts to life with meticulous attention to detail and innovative storytelling.',
  ctaText = 'VIEW OUR WORK',
  ctaLink = '/work'
}) => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Image Left */}
          <div className="w-full md:w-1/2">
            <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gray-200">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Right */}
          <div className="w-full md:w-1/2 space-y-8">
            <div className="space-y-4">
              <h1 className="font-proxima font-bold text-4xl md:text-5xl text-studio-blue tracking-studio uppercase leading-tight">
                {headline}
              </h1>
              <h2 className="font-proxima font-bold text-2xl md:text-3xl text-studio-blue tracking-studio uppercase opacity-70">
                {subheadline}
              </h2>
            </div>

            <div className="w-16 h-0.5 bg-gradient-to-r from-studio-orange to-studio-orange"></div>

            <p className="text-studio-blue leading-relaxed text-lg">
              {description}
            </p>

            <div className="pt-4">
              <a
                href={ctaLink}
                className="inline-flex items-center font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase border-2 border-studio-blue px-8 py-4 hover:bg-studio-blue hover:text-white transition-all duration-300"
              >
                {ctaText}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;