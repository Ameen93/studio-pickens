import React from 'react';

const PageBanner = ({ 
  backgroundImage, 
  altText = "Page banner background",
  height = 'clamp(400px, 45vw, 800px)',
  objectPosition = 'center center',
  objectFit = 'cover',
  className = "",
  children 
}) => {
  return (
    <section 
      className={`relative bg-studio-bg flex items-center justify-center w-full overflow-hidden ${className}`} 
      style={{ height }}
    >
      {/* Background Image */}
      {backgroundImage && (
        <img
          src={`${process.env.PUBLIC_URL}/images/${backgroundImage}`}
          alt={altText}
          className={`absolute inset-0 w-full h-full object-${objectFit} z-0`}
          style={{ objectPosition }}
        />
      )}
      
      {/* Content overlay */}
      <div className="absolute inset-0 z-10">
        {children}
      </div>
    </section>
  );
};

export default PageBanner;