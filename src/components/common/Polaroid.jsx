import React from 'react';

const Polaroid = ({ 
  src, 
  alt, 
  isLoaded, 
  position,
  size,
  rotation,
  zIndex = 40,
  className = ""
}) => {
  const { top, bottom, left, right } = position;
  const { width, height } = size;

  return (
    <div 
      className={`absolute transition-all duration-[2400ms] ease-out ${className}`}
      style={{
        top: isLoaded ? top : '50%',
        bottom,
        left: isLoaded ? left || 'auto' : '50%',
        right,
        width,
        height,
        transform: `${isLoaded ? (left || right ? '' : 'translate(-50%, 0)') : 'translate(-50%, -50%)'} rotate(${isLoaded ? rotation : 0}deg) scale(${isLoaded ? 1 : 2})`,
        transformOrigin: 'center center',
        zIndex
      }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Polaroid;