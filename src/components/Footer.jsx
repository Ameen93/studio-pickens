import React from 'react';
import { NAVIGATION_LINKS } from '../constants';

const navigate = (path) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Footer = () => {
  const pageLinks = NAVIGATION_LINKS.all;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-studio-blue">
      {/* Desktop Layout */}
      <div className="hidden md:block px-[50px] pt-[50px] pb-[50px]">
        <div className="flex justify-between items-start mb-8">
          {/* Left Column - Locations */}
          <div className="flex flex-col space-y-4 w-[400px] flex-shrink-0">
            <button
              onClick={() => navigate('/locations')}
              className="flex items-center space-x-3 group"
            >
              <div className="w-6 h-6 rounded-full border-2 border-studio-orange group-hover:bg-studio-orange transition-colors duration-200"></div>
              <span className="font-proxima-wide font-bold group-hover:font-normal text-white text-[40px] leading-[110%] tracking-[6%] uppercase transition-all duration-200 inline-block min-w-[200px]">
                NEW YORK
              </span>
            </button>
            <button
              onClick={() => navigate('/locations')}
              className="flex items-center space-x-3 group"
            >
              <div className="w-6 h-6 rounded-full border-2 border-studio-orange group-hover:bg-studio-orange transition-colors duration-200"></div>
              <span className="font-proxima-wide font-bold group-hover:font-normal text-white text-[40px] leading-[110%] tracking-[6%] uppercase transition-all duration-200 inline-block min-w-[280px]">
                BEVERLY HILLS
              </span>
            </button>
            <button
              onClick={() => navigate('/locations')}
              className="flex items-center space-x-3 group"
            >
              <div className="w-6 h-6 rounded-full border-2 border-studio-orange group-hover:bg-studio-orange transition-colors duration-200"></div>
              <span className="font-proxima-wide font-bold group-hover:font-normal text-white text-[40px] leading-[110%] tracking-[6%] uppercase transition-all duration-200 inline-block min-w-[160px]">
                LONDON
              </span>
            </button>
          </div>

          {/* Center Column - Page Links in 2x3 Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {pageLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.href)}
                className="relative font-proxima-wide font-bold text-white text-sm tracking-wide uppercase hover:text-studio-orange transition-colors duration-200 text-left"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-studio-orange to-studio-orange transition-all duration-300 hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Right Column - Back to Top */}
          <button
            onClick={scrollToTop}
            className="group cursor-pointer"
          >
            <div className="w-[126px] h-[126px] rounded-full border-[2.21px] border-studio-orange flex items-center justify-center group-hover:bg-studio-orange transition-colors duration-200">
              <span className="font-proxima-wide font-bold text-studio-orange group-hover:text-studio-blue text-[20px] leading-[110%] tracking-[3%] text-center uppercase">
                BACK<br />TO TOP
              </span>
            </div>
          </button>
        </div>

        {/* Bottom Section - Signature positioned under links */}
        <div className="flex justify-between">
          <div></div>
          <div className="flex justify-center ml-80 group cursor-pointer">
            <img
              src={`${process.env.PUBLIC_URL}/images/footer/footer-signature.png`}
              alt="Studio Pickens Signature"
              className="h-16 md:h-20 w-auto group-hover:hidden"
            />
            <img
              src={`${process.env.PUBLIC_URL}/images/footer/footer-signature-white.png`}
              alt="Studio Pickens Signature"
              className="h-16 md:h-20 w-auto hidden group-hover:block"
            />
          </div>
          <div></div>
        </div>

        {/* Copyright */}
        <div className="flex justify-between items-center mt-8">
          <p className="font-proxima text-white text-sm">
            © Studio Pickens 2025
          </p>
          <div className="flex space-x-6">
            <button
              onClick={() => navigate('/terms')}
              className="font-proxima text-white text-sm hover:text-white transition-colors duration-200"
            >
              Terms
            </button>
            <button
              onClick={() => navigate('/legal')}
              className="font-proxima text-white text-sm hover:text-white transition-colors duration-200"
            >
              Legal
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden px-6 pt-12 pb-8">
        {/* Signature at top */}
        <div className="flex justify-left mb-12">
          <img
            src={`${process.env.PUBLIC_URL}/images/footer/footer-signature.png`}
            alt="Studio Pickens Signature"
            className="h-16 w-auto"
          />
        </div>

        {/* Locations */}
        <div className="space-y-6 mb-12">
          <button
            onClick={() => navigate('/locations')}
            className="block font-proxima-wide font-bold text-white text-2xl tracking-[3%] uppercase"
          >
            NEW YORK
          </button>
          <button
            onClick={() => navigate('/locations')}
            className="block font-proxima-wide font-bold text-white text-2xl tracking-[3%] uppercase"
          >
            BEVERLY HILLS
          </button>
          <button
            onClick={() => navigate('/locations')}
            className="block font-proxima-wide font-bold text-white text-2xl tracking-[3%] uppercase"
          >
            LONDON
          </button>
        </div>

        {/* Page Links */}
        <div className="space-y-4 mb-8">
          {pageLinks.map((link) => (
            <div key={link.name} className="block">
              <button
                onClick={() => navigate(link.href)}
                className="inline-block font-proxima-wide font-bold text-white text-lg tracking-[3%] uppercase pb-2"
              >
                {link.name}
              </button>
              <div className="h-0.5 bg-studio-orange" style={{width: `${link.name.length * 0.8}em`}}></div>
            </div>
          ))}
          
          {/* Instagram Link */}
          <div className="block">
            <button
              onClick={() => window.open('https://instagram.com/studiopickens', '_blank')}
              className="inline-block font-proxima-wide font-bold text-white text-lg tracking-[3%] uppercase pb-2"
            >
              INSTAGRAM
            </button>
            <div className="h-0.5 bg-studio-orange" style={{width: '7.2em'}}></div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex justify-between items-center">
          <p className="font-proxima text-white text-sm">
            © Studio Pickens 2025
          </p>
          <div className="flex space-x-6">
            <button
              onClick={() => navigate('/terms')}
              className="font-proxima text-white text-sm"
            >
              Terms
            </button>
            <button
              onClick={() => navigate('/legal')}
              className="font-proxima text-white text-sm"
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