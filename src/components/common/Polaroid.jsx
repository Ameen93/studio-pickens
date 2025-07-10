import React from 'react';
import ImageWithPath from './ImageWithPath';

const Polaroid = ({ 
  src, 
  category = "polaroids",
  filename,
  alt, 
  isLoaded, 
  position,
  size,
  rotation,
  animationDuration = 2400,
  initialOffset = { x: 0, y: 0 },
  zIndex = 40,
  className = ""
}) => {
  const { top, bottom, left, right } = position;
  const { width, height } = size;

  return (
    <div 
      className={`absolute ${className}`}
      style={{
        top: isLoaded ? top : '50%',
        bottom,
        left: isLoaded ? left || 'auto' : '50%',
        right,
        width,
        height,
        transform: `${isLoaded ? (left ? '' : right ? '' : 'translate(-50%, 0)') : `translate(calc(-50% + ${initialOffset.x}px), calc(-50% + ${initialOffset.y}px))`} rotate(${rotation}deg) scale(${isLoaded ? 1 : 1.5})`,
        transformOrigin: 'center center',
        transition: `all ${animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        zIndex
      }}
    >
      {filename ? (
        <ImageWithPath
          category={category}
          filename={filename}
          alt={alt}
          className="w-full h-full object-contain"
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
        />
      )}
    </div>
  );
};

export default Polaroid;