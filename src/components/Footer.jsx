import React from 'react';
import { NAVIGATION_LINKS } from '../constants';

const navigate = (path) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const Footer = () => {
  const pageLinks = NAVIGATION_LINKS.all;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-studio-blue py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left Column - Locations */}
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full border-2 border-white"></div>
              <span className="font-proxima-wide font-bold text-white text-2xl md:text-3xl tracking-wide uppercase">
                NEW YORK
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full border-2 border-white"></div>
              <span className="font-proxima-wide font-bold text-white text-2xl md:text-3xl tracking-wide uppercase">
                BEVERLY HILLS
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full border-2 border-white"></div>
              <span className="font-proxima-wide font-bold text-white text-2xl md:text-3xl tracking-wide uppercase">
                LONDON
              </span>
            </div>
          </div>

          {/* Center Column - Page Links */}
          <div className="flex flex-col items-center space-y-4">
            {pageLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.href)}
                className="relative font-proxima-wide font-bold text-white text-sm tracking-wide uppercase hover:text-white/80 transition-colors duration-200"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-studio-orange to-studio-orange transition-all duration-300 hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Right Column - Signature and Back to Top */}
          <div className="flex flex-col items-end space-y-8">
            {/* Signature Logo */}
            <div className="flex items-center">
              <img
                src="/images/footer/footer-signature-white.png"
                alt="Studio Pickens Signature"
                className="h-16 md:h-20 w-auto"
              />
            </div>
            
            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="flex items-center group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full border-2 border-studio-orange flex items-center justify-center mr-4 group-hover:bg-studio-orange/10 transition-colors duration-200">
                <span className="font-proxima-wide font-bold text-studio-orange text-sm tracking-wide uppercase">
                  BACK<br />TO TOP
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/20 flex justify-between items-center">
          <p className="font-proxima text-white/60 text-sm">
            © Studio Pickens 2025
          </p>
          <div className="flex space-x-6">
            <button
              onClick={() => navigate('/terms')}
              className="font-proxima text-white/60 text-sm hover:text-white transition-colors duration-200"
            >
              Terms
            </button>
            <button
              onClick={() => navigate('/legal')}
              className="font-proxima text-white/60 text-sm hover:text-white transition-colors duration-200"
            >
              Legal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;