import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const LocationsPage = () => {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // Start animation after 1.5 second delay
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);


  return (
    <Layout title="Studio Pickens - Locations">
      {/* Locations Page Banner */}
      <section 
        className="relative bg-studio-bg flex items-center justify-center w-full overflow-hidden" 
        style={{ 
          height: 'clamp(400px, 45vw, 800px)',
        }}
      >
        {/* Animated Outline Circles */}
        {[...Array(6)].map((_, index) => {
          const isLeft = index < 3;
          // Left circles: -400px, -280px, -160px
          // Right circles: +160px, +280px, +400px
          const translateX = isLeft 
            ? -400 + (index * 120) 
            : 160 + ((index - 3) * 120);
          
          return (
            <div 
              key={index}
              className="absolute w-full flex justify-center z-5" 
              style={{ top: '60%', transform: 'translateY(-50%)' }}
            >
              <div 
                className="rounded-full border-2 border-studio-blue transition-transform duration-1000 ease-out"
                style={{
                  width: 'clamp(300px, 35.76vw, 515px)',
                  height: 'clamp(300px, 35.76vw, 515px)',
                  transform: animationStarted 
                    ? `translateX(${translateX}px)` 
                    : 'translateX(0px)'
                }}
              />
            </div>
          );
        })}

        {/* Blue Filled Circle */}
        <div className="absolute w-full flex justify-center z-10" style={{ top: '60%', transform: 'translateY(-50%)' }}>
          <div 
            className="rounded-full bg-studio-blue"
            style={{
              width: 'clamp(300px, 35.76vw, 515px)',
              height: 'clamp(300px, 35.76vw, 515px)'
            }}
          />
        </div>

        {/* Center Content */}
        <div className="text-center z-20" style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <h1 className="font-proxima-wide font-bold text-studio-orange uppercase" style={{ fontSize: '55px' }}>
            Locations
          </h1>
        </div>
      </section>

      {/* Location Images with Info Boxes */}
      <section className="bg-studio-bg py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="space-y-16">
            {/* New York - Info Left, Image Right on Desktop / Stacked on Mobile */}
            <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center group">
              {/* Info Box */}
              <div 
                className="bg-white md:group-hover:bg-studio-blue transition-colors duration-300 p-8 flex flex-col justify-between cursor-pointer order-1 md:order-1 relative"
                style={{
                  width: 'clamp(360px, 25vw, 360px)',
                  height: 'clamp(200px, 44.44vw, 640px)'
                }}
                onClick={() => window.open('https://maps.google.com/?q=283+Wythe+Avenue+Brooklyn+NY+11249+USA', '_blank')}
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
                  <h3 className="font-proxima-wide font-bold text-studio-blue md:group-hover:text-studio-bg transition-colors duration-300 uppercase text-xl md:text-2xl mb-2 md:mb-4">
                    New York
                  </h3>
                  
                  {/* Address */}
                  <p className="font-proxima text-studio-blue md:group-hover:text-studio-bg transition-colors duration-300 text-base md:text-lg leading-tight md:leading-relaxed">
                    283 Wythe Avenue<br />
                    Brooklyn, NY 11249<br />
                    USA
                  </p>
                </div>
              </div>
              
              {/* Image */}
              <div 
                className="bg-gray-200 overflow-hidden cursor-pointer order-2 md:order-2"
                style={{
                  width: 'clamp(485px, 67.36vw, 970px)',
                  height: 'clamp(420px, 44.44vw, 640px)'
                }}
                onClick={() => window.open('https://maps.google.com/?q=283+Wythe+Avenue+Brooklyn+NY+11249+USA', '_blank')}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/locations/locations-new-york.png`}
                  alt="New York Studio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Beverly Hills - Image Left, Info Right on Desktop / Stacked on Mobile */}
            <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center group">
              {/* Info Box */}
              <div 
                className="bg-white md:group-hover:bg-studio-blue transition-colors duration-300 p-8 flex flex-col justify-between cursor-pointer order-1 md:order-2 relative"
                style={{
                  width: 'clamp(360px, 25vw, 360px)',
                  height: 'clamp(200px, 44.44vw, 640px)'
                }}
                onClick={() => window.open('https://maps.google.com/?q=17+Langley+Court+Covent+Garden+London+WC2E+9JY+United+Kingdom', '_blank')}
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
                  <h3 className="font-proxima-wide font-bold text-studio-blue md:group-hover:text-studio-bg transition-colors duration-300 uppercase text-xl md:text-2xl mb-2 md:mb-4">
                    Beverly Hills
                  </h3>
                  
                  {/* Address */}
                  <p className="font-proxima text-studio-blue md:group-hover:text-studio-bg transition-colors duration-300 text-base md:text-lg leading-tight md:leading-relaxed">
                    17 Langley Court<br />
                    Covent Garden<br />
                    London WC2E 9JY<br />
                    United Kingdom
                  </p>
                </div>
              </div>

              {/* Image */}
              <div 
                className="bg-gray-200 overflow-hidden cursor-pointer order-2 md:order-1"
                style={{
                  width: 'clamp(485px, 67.36vw, 970px)',
                  height: 'clamp(420px, 44.44vw, 640px)'
                }}
                onClick={() => window.open('https://maps.google.com/?q=17+Langley+Court+Covent+Garden+London+WC2E+9JY+United+Kingdom', '_blank')}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/locations/locations-beverley-hills.png`}
                  alt="Beverly Hills Studio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* London - Info Left, Image Right on Desktop / Stacked on Mobile */}
            <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center group">
              {/* Info Box */}
              <div 
                className="bg-white md:group-hover:bg-studio-blue transition-colors duration-300 p-8 flex flex-col justify-between cursor-pointer order-1 md:order-1 relative"
                style={{
                  width: 'clamp(360px, 25vw, 360px)',
                  height: 'clamp(200px, 44.44vw, 640px)'
                }}
                onClick={() => window.open('https://maps.google.com/?q=17+Langley+Court+Covent+Garden+London+WC2E+9JY+United+Kingdom', '_blank')}
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
                  <h3 className="font-proxima-wide font-bold text-studio-blue md:group-hover:text-studio-bg transition-colors duration-300 uppercase text-xl md:text-2xl mb-2 md:mb-4">
                    London
                  </h3>
                  
                  {/* Address */}
                  <p className="font-proxima text-studio-blue md:group-hover:text-studio-bg transition-colors duration-300 text-base md:text-lg leading-tight md:leading-relaxed">
                    17 Langley Court<br />
                    Covent Garden<br />
                    London WC2E 9JY<br />
                    United Kingdom
                  </p>
                </div>
              </div>
              
              {/* Image */}
              <div 
                className="bg-gray-200 overflow-hidden cursor-pointer order-2 md:order-2"
                style={{
                  width: 'clamp(485px, 67.36vw, 970px)',
                  height: 'clamp(420px, 44.44vw, 640px)'
                }}
                onClick={() => window.open('https://maps.google.com/?q=17+Langley+Court+Covent+Garden+London+WC2E+9JY+United+Kingdom', '_blank')}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/locations/locations-london.png`}
                  alt="London Studio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default LocationsPage;