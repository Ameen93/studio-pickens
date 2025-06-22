import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const StoryPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout title="Studio Pickens - Story">
      {/* Story Section */}
      <section className="bg-studio-bg py-8 px-4 pb-32 w-full">
        <div className="w-full max-w-5xl mx-auto">
          {/* Roots Circle */}
          <div className="flex justify-center w-full">
            <div className="relative flex items-center justify-center">
              {/* Blue Outline Circle */}
              <div
                className="rounded-full border border-studio-blue flex items-center justify-center"
                style={{
                  width: 'min(513px, 70vw)',
                  height: 'min(513px, 70vw)',
                }}
              >
                {/* Roots Title */}
                <h1
                  className="font-proxima-wide font-bold text-studio-blue uppercase text-center"
                  style={{ fontSize: '64px' }}
                >
                  Roots
                </h1>
              </div>
            </div>
          </div>

          {/* First Major Movie Set Circle */}
          <div className="flex justify-center w-full" style={{ marginTop: '-80px' }}>
            <div className="relative flex items-center justify-center">
              {/* Layout Container */}
              <div 
                className="rounded-full"
                style={{
                  width: 'min(961px, 80vw)',
                  height: 'min(961px, 80vw)',
                }}
              />
              
              {/* Large Dashed Rotating Circle - SVG Overlay */}
              <svg 
                className="absolute inset-0"
                style={{
                  width: 'min(961px, 80vw)',
                  height: 'min(961px, 80vw)',
                  transform: `rotate(${scrollY * 0.1}deg)`,
                  willChange: 'transform'
                }}
              >
                <circle
                  cx="50%"
                  cy="50%"
                  r="calc(50% - 2px)"
                  fill="none"
                  stroke="#0025B8"
                  strokeWidth="2"
                  strokeDasharray="10 10"
                />
              </svg>
              
              {/* Polaroid at 9:15 */}
              <div 
                className="absolute"
                style={{
                  top: '45%',
                  left: '-3%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/polaroids/polaroid7.JPG`}
                    alt="Polaroid 7"
                    className="w-80 h-auto object-contain"
                  />
                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                    <span className="font-proxima text-studio-blue text-2xl font-bold">2017</span>
                  </div>
                </div>
              </div>
              
              {/* Polaroid at 3:15 */}
              <div 
                className="absolute"
                style={{
                  top: '55%',
                  right: '-3%',
                  transform: 'translate(50%, -50%)'
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/polaroids/polaroid7.JPG`}
                    alt="Polaroid 7"
                    className="w-80 h-auto object-contain"
                  />
                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                    <span className="font-proxima text-studio-blue text-2xl font-bold">2017</span>
                  </div>
                </div>
              </div>
              
              {/* Process 2017 text at 1:20 */}
              <div 
                className="absolute"
                style={{
                  top: '20%',
                  right: '6%',
                  transform: 'translate(50%, -50%)'
                }}
              >
                <span className="font-lovtony text-studio-blue" style={{ fontSize: '135px' }}>process 2017</span>
              </div>
              
              {/* Word of mouth spreads text at 7:20 */}
              <div 
                className="absolute text-center"
                style={{
                  bottom: '20%',
                  left: '3%',
                  transform: 'translate(-50%, 50%) rotate(-8deg)'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: '135px', lineHeight: '0.3' }}>word of mouth</span>
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: '135px', lineHeight: '0.3' }}>spreads</span>
                </div>
              </div>
              
              {/* Center Content - positioned absolutely to avoid rotation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center px-6 max-w-xl">
                  <h5 className="font-proxima-wide font-bold text-studio-blue uppercase mb-4" style={{ fontSize: '32px', lineHeight: '1.1', whiteSpace: 'nowrap' }}>
                    First Major Movie Set
                  </h5>
                  <p className="font-proxima text-studio-blue" style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                    Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus. Amet sed risus lacinia sed. Quis ultricies vestibulum eleifend dignissim auctor laoreet feugiat.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Third Circle - bigger than roots, overlapping first major set */}
          <div className="flex justify-start w-full" style={{ marginTop: '-200px', marginLeft: '-50px' }}>
            <div className="relative flex items-center justify-center">
              {/* Blue Outline Circle */}
              <div 
                className="rounded-full border border-studio-blue"
                style={{
                  width: 'min(648px, 75vw)',
                  height: 'min(648px, 75vw)'
                }}
              />
              
              {/* Polaroid at 6:10 */}
              <div 
                className="absolute"
                style={{
                  bottom: '5%',
                  left: '45%',
                  transform: 'translate(-50%, 50%)',
                  zIndex: 20
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/polaroids/polaroid6.JPG`}
                    alt="Polaroid 6"
                    className="w-80 h-auto object-contain"
                  />
                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                    <span className="font-proxima text-studio-blue text-2xl font-bold">2018</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fourth Circle - same size as circle 3, overlapping bottom right */}
          <div className="flex justify-end w-full" style={{ marginTop: '-250px', marginRight: '-100px' }}>
            <div className="relative flex items-center justify-center">
              {/* Blue Outline Circle */}
              <div 
                className="rounded-full border border-studio-blue flex items-center justify-center"
                style={{
                  width: 'min(648px, 75vw)',
                  height: 'min(648px, 75vw)'
                }}
              >
                {/* Circle Content */}
                <div className="flex flex-col items-center justify-center text-center px-6 max-w-lg">
                  <h3 className="font-proxima-wide font-bold text-studio-blue uppercase text-center mb-4" style={{ fontSize: 'clamp(20px, 5vw, 30px)', lineHeight: '1.1' }}>
                    Mastering The Texture Craft
                  </h3>
                  <p className="font-proxima text-studio-blue" style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                    Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus. Amet sed risus lacinia sed. Quis ultricies vestibulum eleifend dignissim auctor laoreet feugiat.
                  </p>
                </div>
              </div>
              
              {/* First milestone order text at 5:15 */}
              <div 
                className="absolute whitespace-nowrap"
                style={{
                  bottom: '5%',
                  left: '75%',
                  transform: 'translate(-50%, 50%) rotate(7.56deg)'
                }}
              >
                <span className="font-lovtony text-studio-blue" style={{ fontSize: '135px' }}>first milestone order</span>
              </div>
            </div>
          </div>

          {/* Fifth Circle - same as circle 2, centered, overlapping bottom 25% of circle 4 */}
          <div className="flex justify-center w-full" style={{ marginTop: '-180px' }}>
            <div className="relative flex items-center justify-center">
              {/* Layout Container */}
              <div 
                className="rounded-full"
                style={{
                  width: 'min(961px, 80vw)',
                  height: 'min(961px, 80vw)',
                }}
              />
              
              {/* Large Dashed Rotating Circle - SVG Overlay */}
              <svg 
                className="absolute inset-0"
                style={{
                  width: 'min(961px, 80vw)',
                  height: 'min(961px, 80vw)',
                  transform: `rotate(${scrollY * 0.1}deg)`,
                  willChange: 'transform'
                }}
              >
                <circle
                  cx="50%"
                  cy="50%"
                  r="calc(50% - 2px)"
                  fill="none"
                  stroke="#0025B8"
                  strokeWidth="2"
                  strokeDasharray="10 10"
                />
              </svg>
              
              {/* Polaroid at 9:15 */}
              <div 
                className="absolute"
                style={{
                  top: '45%',
                  left: '-3%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/polaroids/polaroid9.JPG`}
                    alt="Polaroid 9"
                    className="w-80 h-auto object-contain"
                  />
                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                    <span className="font-proxima text-studio-blue text-2xl font-bold">2020</span>
                  </div>
                </div>
              </div>
              
              {/* Polaroid at 3:15 */}
              <div 
                className="absolute"
                style={{
                  top: '55%',
                  right: '-3%',
                  transform: 'translate(50%, -50%)'
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/polaroids/polaroid9.JPG`}
                    alt="Polaroid 9"
                    className="w-80 h-auto object-contain"
                  />
                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                    <span className="font-proxima text-studio-blue text-2xl font-bold">2020</span>
                  </div>
                </div>
              </div>
              
              {/* Polaroid at 6 o'clock */}
              <div 
                className="absolute"
                style={{
                  bottom: '-5%',
                  left: '50%',
                  transform: 'translate(-50%, 50%)',
                  zIndex: 10
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/polaroids/polaroid13.JPG`}
                    alt="Polaroid 13"
                    className="h-auto object-contain"
                    style={{ width: '416px' }}
                  />
                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                    <span className="font-proxima text-studio-blue text-2xl font-bold">2024</span>
                  </div>
                </div>
              </div>
              
              {/* Center Content - positioned absolutely to avoid rotation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center px-6 max-w-lg">
                  <h5 className="font-proxima-wide font-bold text-studio-blue uppercase mb-4" style={{ fontSize: 'clamp(18px, 3.5vw, 24px)', lineHeight: '1.1' }}>
                    theatre theatre and more theatre
                  </h5>
                  <p className="font-proxima text-studio-blue" style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                    Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus. Amet sed risus lacinia sed. Quis ultricies vestibulum eleifend dignissim auctor laoreet feugiat.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sixth Circle - 15% bigger than circle 4, below circle 5 */}
          <div className="flex justify-center w-full" style={{ marginTop: '100px' }}>
            <div className="relative flex items-center justify-center" style={{ zIndex: 1 }}>
              {/* Blue Outline Circle */}
              <div 
                className="rounded-full border border-studio-blue flex items-center justify-center"
                style={{
                  width: 'min(750px, 75vw)',
                  height: 'min(750px, 75vw)'
                }}
              >
                {/* Circle Content */}
                <div className="flex flex-col items-center justify-center text-center px-6 max-w-lg">
                  <h3 className="font-proxima-wide font-bold text-studio-blue uppercase text-center mb-4" style={{ fontSize: 'clamp(20px, 5vw, 30px)', lineHeight: '1.1' }}>
                    In his signature era
                  </h3>
                  <p className="font-proxima text-studio-blue" style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', lineHeight: '1.5' }}>
                    Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus. Amet sed risus lacinia sed. Quis ultricies vestibulum eleifend dignissim auctor laoreet feugiat.
                  </p>
                </div>
              </div>
              
              {/* Requested by name text at 9:30 o'clock */}
              <div 
                className="absolute text-center"
                style={{
                  top: '35%',
                  left: '5%',
                  transform: 'translate(-50%, -50%) rotate(-7.5deg)'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: '135px', lineHeight: '0.3' }}>requested by</span>
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: '135px', lineHeight: '0.3' }}>name</span>
                </div>
              </div>

              {/* Polaroid at 9:15 - 2024 */}
              <div 
                className="absolute"
                style={{
                  top: '45%',
                  left: '-40%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/polaroids/polaroid13.JPG`}
                    alt="Polaroid 13"
                    className="w-80 h-auto object-contain"
                  />
                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                    <span className="font-proxima text-studio-blue text-2xl font-bold">2024</span>
                  </div>
                </div>
              </div>
              
              {/* Polaroid at 3:15 - 2024 */}
              <div 
                className="absolute"
                style={{
                  top: '55%',
                  right: '-40%',
                  transform: 'translate(50%, -50%)',
                  zIndex: 10
                }}
              >
                <div className="relative">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/polaroids/polaroid13.JPG`}
                    alt="Polaroid 13"
                    className="w-80 h-auto object-contain"
                  />
                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                    <span className="font-proxima text-studio-blue text-2xl font-bold">2024</span>
                  </div>
                </div>
              </div>

              {/* Custom visions and requests text at 5:30 o'clock */}
              <div 
                className="absolute text-center"
                style={{
                  bottom: '10%',
                  left: '78%',
                  transform: 'translate(-50%, 50%) rotate(-1.64deg)',
                  width: '800px'
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: '135px', lineHeight: '0.3' }}>custom visions</span>
                  <span className="font-lovtony text-studio-blue" style={{ fontSize: '135px', lineHeight: '0.3' }}>and requests</span>
                </div>
              </div>
              
              {/* Contact button at 6 o'clock */}
              <div 
                className="absolute"
                style={{
                  bottom: '-48px',
                  left: '50%',
                  transform: 'translate(-50%, 0%)'
                }}
              >
                <button
                  onClick={() => {
                    window.history.pushState({}, '', '/contact');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-studio-blue w-24 h-24 rounded-full flex items-center justify-center hover:bg-studio-orange transition-colors duration-300 group"
                >
                  <span className="font-proxima-wide text-studio-orange group-hover:text-studio-blue font-bold uppercase transition-colors duration-300" style={{ fontSize: '14px' }}>
                    Contact
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StoryPage;