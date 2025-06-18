import React, { useState, useEffect } from 'react';
import { NAVIGATION_LINKS } from '../constants';

const navigate = (path) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Navbar = () => {
  // Get current pathname for active state
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate scroll progress for smooth animations
  const scrollProgress = Math.min(Math.max(scrollY - 80, 0) / 80, 1); // Progress from 80px to 160px
  const isHomePage = currentPath === '/';

  const { left: leftLinks, right: rightLinks } = NAVIGATION_LINKS;
  const allLinks = [...leftLinks, ...rightLinks];

  const isActive = (href) => {
    if (href === '/' && currentPath === '/') return true;
    if (href !== '/' && currentPath.startsWith(href)) return true;
    return false;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-studio-bg w-full">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-center py-6">
          <div className="flex items-center justify-center">
            {/* All Links with Conditional Center Title */}
            {leftLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.href)}
                className="relative text-nav font-proxima-wide text-nav-blue uppercase min-h-[44px] flex items-center text-center group mx-6"
              >
                <span className="relative">
                  {link.name}
                  <span className={`absolute top-full left-0 h-0.5 bg-nav-orange transition-all duration-300 ${
                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </span>
              </button>
            ))}

            {/* Center Title - Show on scroll for home page, always show for other pages */}
            {(isHomePage ? scrollProgress > 0 : true) && (
              <div 
                className="transition-all duration-200 ease-out overflow-hidden flex justify-center mx-6"
                style={{
                  opacity: isHomePage ? scrollProgress : 1,
                  transform: isHomePage ? `scale(${0.75 + scrollProgress * 0.25})` : 'scale(1)',
                }}
              >
                <button
                  onClick={() => navigate('/')}
                  className="text-nav-logo font-proxima-wide text-nav-blue uppercase text-center whitespace-nowrap"
                >
                  STUDIO PICKENS
                </button>
              </div>
            )}

            {rightLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.href)}
                className="relative text-nav font-proxima-wide text-nav-blue uppercase min-h-[44px] flex items-center text-center group mx-6"
              >
                <span className="relative">
                  {link.name}
                  <span className={`absolute top-full left-0 h-0.5 bg-nav-orange transition-all duration-300 ${
                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Header */}
          <div className="flex items-center py-6">
            {/* Logo Section - Takes up remaining space and centers logo */}
            <div className="flex-1 flex justify-center">
              <button
                onClick={() => navigate('/')}
                className="text-nav-logo font-proxima-wide text-nav-blue uppercase text-center"
              >
                STUDIO PICKENS
              </button>
            </div>
            
            {/* Burger Menu Section - Fixed width with equal padding */}
            <div className="flex justify-center px-4">
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-nav-blue focus:outline-none"
                aria-label="Toggle menu"
              >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="border-t border-studio-blue/10 py-4">
              <div className="flex flex-col space-y-4">
                {allLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => {
                      navigate(link.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="relative text-nav font-proxima-wide text-nav-blue uppercase text-center py-2 group"
                  >
                    <span className="relative">
                      {link.name}
                      <span className={`absolute top-full left-1/2 transform -translate-x-1/2 h-0.5 bg-nav-orange transition-all duration-300 ${
                        isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;