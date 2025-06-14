import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  onClick, 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-proxima font-bold tracking-studio uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-white text-studio-blue hover:bg-gray-100 focus:ring-studio-blue',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-studio-blue focus:ring-white',
    link: 'text-studio-orange hover:text-studio-orange/80 underline decoration-studio-orange decoration-2 underline-offset-4 focus:ring-studio-orange',
    secondary: 'bg-studio-blue text-white hover:bg-studio-blue/90 focus:ring-studio-blue'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  // If href is provided, render as a link
  if (href) {
    return (
      <a 
        href={href} 
        className={classes}
        {...props}
      >
        {children}
        {variant === 'link' && ' →'}
        {(variant === 'primary' || variant === 'secondary') && (
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </a>
    );
  }
  
  // Otherwise render as button
  return (
    <button 
      onClick={onClick}
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
      {variant === 'link' && ' →'}
      {(variant === 'primary' || variant === 'secondary') && (
        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
};

export default Button;