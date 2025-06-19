import React from 'react';
import LocationButton from '../common/LocationButton';

const FooterLocations = ({ variant = 'desktop', onLocationClick }) => {
  const locations = ['brooklyn', 'beverlyhills', 'london'];
  
  const containerClass = variant === 'desktop' 
    ? 'flex flex-col space-y-4 w-[600px] flex-shrink-0'
    : 'space-y-6 mb-12';

  return (
    <div className={containerClass}>
      {locations.map((location) => (
        <LocationButton 
          key={location}
          location={location} 
          onClick={() => onLocationClick('/locations')} 
          variant={variant}
        />
      ))}
    </div>
  );
};

export default FooterLocations;