import React from 'react';
import { TYPOGRAPHY_CLASSES } from '../../constants/typography';
import ImageWithPath from './ImageWithPath';
import { validateLocationData } from '../../utils/validation';

const LocationInfo = React.memo(({ 
  location, 
  address,
  imagePath,
  imageAlt,
  mapsUrl,
  variant = 'left' // 'left' | 'right'
}) => {
  const isLeft = variant === 'left';
  
  // Validate location data in development
  if (process.env.NODE_ENV === 'development') {
    const validation = validateLocationData({
      location,
      address,
      imagePath,
      imageAlt,
      mapsUrl
    });
    
    if (!validation.isValid) {
      console.warn(`LocationInfo validation errors for "${location}":`, validation.errors);
    }
  }
  
  return (
    <div className={`flex flex-col gap-4 md:gap-0 md:flex-row items-center group px-0`}>
      {/* Info Box */}
      <div 
        className={`bg-white md:group-hover:bg-studio-blue transition-colors duration-300 pt-8 pr-8 pb-12 pl-12 flex flex-col justify-between cursor-pointer relative w-full md:w-1/4 ${
          isLeft ? 'order-1 md:order-1' : 'order-1 md:order-2'
        }`}
        style={{
          height: 'clamp(250px, 50vw, 720px)'
        }}
        onClick={() => window.open(mapsUrl, '_blank')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.open(mapsUrl, '_blank');
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View ${location} location on Google Maps`}
      >
        <div></div>
        
        {/* Bottom Content */}
        <div>
          {/* Location Icon */}
          <div className="w-12 h-12 mb-4 -ml-2">
            <svg className="w-full h-full text-studio-orange" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          
          {/* City Name */}
          <h3 className={`${TYPOGRAPHY_CLASSES.headingPrimary} md:group-hover:text-studio-bg transition-colors duration-300 text-xl md:text-2xl mb-2 md:mb-4`}>
            {location}
          </h3>
          
          {/* Address */}
          <div className={`${TYPOGRAPHY_CLASSES.bodyText} md:group-hover:text-studio-bg transition-colors duration-300 text-base md:text-lg leading-tight md:leading-relaxed`}>
            {address.split('\n').map((line, index) => (
              <div key={index}>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Image */}
      <div 
        className={`bg-gray-200 overflow-hidden cursor-pointer w-full md:w-3/4 ${
          isLeft ? 'order-2 md:order-2' : 'order-2 md:order-1'
        }`}
        style={{
          height: 'clamp(250px, 50vw, 720px)'
        }}
        onClick={() => window.open(mapsUrl, '_blank')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.open(mapsUrl, '_blank');
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View ${location} studio location image`}
      >
        <ImageWithPath
          category="locations"
          filename={imagePath}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
});

LocationInfo.displayName = 'LocationInfo';

export default LocationInfo;