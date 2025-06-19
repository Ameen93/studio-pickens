import React from 'react';

const ImageWithPath = ({ 
  category, 
  filename, 
  alt, 
  className = "",
  style,
  ...props 
}) => {
  const src = `${process.env.PUBLIC_URL}/images/${category}/${filename}`;
  
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...props}
    />
  );
};

export default ImageWithPath;