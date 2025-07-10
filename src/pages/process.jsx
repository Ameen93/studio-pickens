import React from 'react';
import Layout from '../components/Layout';
import { ANIMATIONS } from '../constants/animations';

const ProcessPage = () => {
  return (
    <Layout title="Studio Pickens - Process">
      {/* Process Page Banner */}
      <section 
        className="relative bg-studio-bg flex items-center justify-center w-full overflow-hidden -mt-16" 
        style={{ 
          height: 'clamp(700px, 70vw, 1200px)',
        }}
      >
        {/* Background Image - Desktop */}
        <img
          src={`${process.env.PUBLIC_URL}/images/process/banner/Desktop_PROCESS Hero Banner v2.png`}
          alt="Process banner background"
          className="absolute inset-0 w-full h-full object-cover z-0 hidden xl:block"
        />
        
        {/* Background Image - Mobile */}
        <img
          src={`${process.env.PUBLIC_URL}/images/process/banner/Mobile_Hero Banner_process.png`}
          alt="Process banner background"
          className="absolute inset-0 w-full h-full object-cover z-0 block xl:hidden"
        />

        {/* Rotating Dashed Circle */}
        <div className="absolute w-full flex justify-center z-10" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <svg 
            className="animate-spin"
            style={{
              width: 'clamp(342px, 70vw, 513px)',
              height: 'clamp(342px, 70vw, 513px)',
              animationDuration: '60s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite'
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
        </div>

        {/* Center Content */}
        <div className="text-center z-20" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <h1 className="font-proxima-wide font-bold text-studio-blue uppercase" style={{ fontSize: '55px' }}>
            Process
          </h1>
        </div>
      </section>

      {/* Process Gallery Section */}
      <section className="pt-16 pb-10 px-4 md:px-10 max-w-full mx-auto">
        {/* Item 1: 90% science / 10% wigmaking */}
        <div className="flex flex-col lg:flex-row items-end mb-10 gap-4">
          <div className="w-full lg:w-[55%] lg:pr-3 lg:order-1 order-2">
            <img
              src={`${process.env.PUBLIC_URL}/images/process/process-page2.jpg`}
              alt="90% science / 10% wigmaking"
              className="w-full object-cover"
              style={{ height: 'clamp(300px, 80vw, 508px)', objectPosition: 'center center' }}
            />
          </div>
          <div className="w-full lg:w-[45%] lg:pl-3 lg:order-2 order-1 lg:text-left text-center">
            <h2 className="font-proxima-wide font-bold text-studio-blue uppercase mb-4" style={{ fontSize: '24px' }}>
              <span className="lg:hidden">90% science / 10% wigmaking</span>
              <span className="hidden lg:inline">90% science / 10% wigmaking</span>
            </h2>
            <p className="font-proxima text-studio-blue leading-relaxed" style={{ fontSize: '16px' }}>
              Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus. Amet sed risus lacinia sed. Quis ultricies vestibulum eleifend dignissim auctor laoreet feugiat.
            </p>
          </div>
        </div>

        {/* Item 2: Consultation */}
        <div className="flex flex-col lg:flex-row-reverse items-end mb-10 gap-4">
          <div className="w-full lg:w-[55%] lg:pl-3 lg:order-1 order-2">
            <img
              src={`${process.env.PUBLIC_URL}/images/process/process-page3.jpg`}
              alt="Consultation"
              className="w-full object-cover"
              style={{ height: 'clamp(300px, 80vw, 508px)', objectPosition: 'center center' }}
            />
          </div>
          <div className="w-full lg:w-[45%] lg:pr-3 lg:order-2 order-1 lg:text-left text-center">
            <h2 className="font-proxima-wide font-bold text-studio-blue uppercase mb-4" style={{ fontSize: '24px' }}>
              Consultation
            </h2>
            <p className="font-proxima text-studio-blue leading-relaxed" style={{ fontSize: '16px' }}>
              Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus. Amet sed risus lacinia sed. Quis ultricies vestibulum eleifend dignissim auctor laoreet feugiat.
            </p>
          </div>
        </div>

        {/* Item 3: mapping the head */}
        <div className="flex flex-col lg:flex-row items-end mb-10 gap-4">
          <div className="w-full lg:w-[55%] lg:pr-3 lg:order-1 order-2">
            <img
              src={`${process.env.PUBLIC_URL}/images/process/process-page4.jpg`}
              alt="mapping the head"
              className="w-full object-cover"
              style={{ height: 'clamp(300px, 80vw, 508px)', objectPosition: 'center center' }}
            />
          </div>
          <div className="w-full lg:w-[45%] lg:pl-3 lg:order-2 order-1 lg:text-left text-center">
            <h2 className="font-proxima-wide font-bold text-studio-blue uppercase mb-4" style={{ fontSize: '24px' }}>
              mapping the head
            </h2>
            <p className="font-proxima text-studio-blue leading-relaxed" style={{ fontSize: '16px' }}>
              Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus. Amet sed risus lacinia sed. Quis ultricies vestibulum eleifend dignissim auctor laoreet feugiat.
            </p>
          </div>
        </div>

        {/* Item 4: treatment */}
        <div className="flex flex-col lg:flex-row-reverse items-end mb-10 gap-4">
          <div className="w-full lg:w-[55%] lg:pl-3 lg:order-1 order-2">
            <img
              src={`${process.env.PUBLIC_URL}/images/process/process-page5.jpg`}
              alt="treatment"
              className="w-full object-cover"
              style={{ height: 'clamp(300px, 80vw, 508px)', objectPosition: 'center center' }}
            />
          </div>
          <div className="w-full lg:w-[45%] lg:pr-3 lg:order-2 order-1 lg:text-left text-center">
            <h2 className="font-proxima-wide font-bold text-studio-blue uppercase mb-4" style={{ fontSize: '24px' }}>
              treatment
            </h2>
            <p className="font-proxima text-studio-blue leading-relaxed" style={{ fontSize: '16px' }}>
              Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus. Amet sed risus lacinia sed. Quis ultricies vestibulum eleifend dignissim auctor laoreet feugiat.
            </p>
          </div>
        </div>

        {/* Item 5: approval */}
        <div className="flex flex-col lg:flex-row items-end mb-10 gap-4">
          <div className="w-full lg:w-[55%] lg:pr-3 lg:order-1 order-2">
            <img
              src={`${process.env.PUBLIC_URL}/images/process/process-page6.png`}
              alt="approval"
              className="w-full object-cover"
              style={{ height: 'clamp(300px, 80vw, 508px)', objectPosition: 'center center' }}
            />
          </div>
          <div className="w-full lg:w-[45%] lg:pl-3 lg:order-2 order-1 lg:text-left text-center">
            <h2 className="font-proxima-wide font-bold text-studio-blue uppercase mb-4" style={{ fontSize: '24px' }}>
              approval
            </h2>
            <p className="font-proxima text-studio-blue leading-relaxed" style={{ fontSize: '16px' }}>
              Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus. Amet sed risus lacinia sed. Quis ultricies vestibulum eleifend dignissim auctor laoreet feugiat.
            </p>
          </div>
        </div>
      </section>

      {/* Polaroid Carousel Section */}
      <section className="py-16 bg-studio-bg overflow-hidden">
        <div className="relative">
          <div className="flex animate-scroll space-x-8 hover:pause-animation">
            {/* First set of polaroids */}
            <div className="flex space-x-8 flex-shrink-0">
              {[
                'polaroid1.png', 'polaroid2.png', 'polaroid3.png', 'polaroid4.JPG',
                'polaroid5.JPG', 'polaroid6.JPG', 'polaroid7.JPG', 'polaroid8.JPG',
                'polaroid9.JPG', 'polaroid10.JPG', 'polaroid11.JPG', 'polaroid12.JPG', 'polaroid13.JPG'
              ].map((filename, index) => {
                const isHorizontal = filename === 'polaroid1.png' || filename === 'polaroid3.png';
                return (
                  <div key={`polaroid-${index}`} className="flex-shrink-0 w-48 flex justify-center items-center">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/polaroids/${filename}`}
                      alt={`Polaroid ${index + 1}`}
                      className={`h-64 w-auto object-contain ${isHorizontal ? 'rotate-90' : ''}`}
                    />
                  </div>
                );
              })}
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex space-x-8 flex-shrink-0">
              {[
                'polaroid1.png', 'polaroid2.png', 'polaroid3.png', 'polaroid4.JPG',
                'polaroid5.JPG', 'polaroid6.JPG', 'polaroid7.JPG', 'polaroid8.JPG',
                'polaroid9.JPG', 'polaroid10.JPG', 'polaroid11.JPG', 'polaroid12.JPG', 'polaroid13.JPG'
              ].map((filename, index) => {
                const isHorizontal = filename === 'polaroid1.png' || filename === 'polaroid3.png';
                return (
                  <div key={`polaroid-duplicate-${index}`} className="flex-shrink-0 w-48 flex justify-center items-center">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/polaroids/${filename}`}
                      alt={`Polaroid ${index + 1}`}
                      className={`h-64 w-auto object-contain ${isHorizontal ? 'rotate-90' : ''}`}
                    />
                  </div>
                );
              })}
            </div>
            {/* Third set for seamless loop */}
            <div className="flex space-x-8 flex-shrink-0">
              {[
                'polaroid1.png', 'polaroid2.png', 'polaroid3.png', 'polaroid4.JPG',
                'polaroid5.JPG', 'polaroid6.JPG', 'polaroid7.JPG', 'polaroid8.JPG',
                'polaroid9.JPG', 'polaroid10.JPG', 'polaroid11.JPG', 'polaroid12.JPG', 'polaroid13.JPG'
              ].map((filename, index) => {
                const isHorizontal = filename === 'polaroid1.png' || filename === 'polaroid3.png';
                return (
                  <div key={`polaroid-triple-${index}`} className="flex-shrink-0 w-48 flex justify-center items-center">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/polaroids/${filename}`}
                      alt={`Polaroid ${index + 1}`}
                      className={`h-64 w-auto object-contain ${isHorizontal ? 'rotate-90' : ''}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <style jsx>{`
          ${ANIMATIONS.keyframes.scroll}
          
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          
          .hover\\:pause-animation:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto relative" style={{ minHeight: '800px' }}>
        {/* Decorative Circles - fixed position */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-[290px] lg:top-[340px] left-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Small circle */}
            <div className="absolute rounded-full border-2 border-studio-blue lg:hidden" style={{ 
              width: '220px', 
              height: '220px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}></div>
            <div className="hidden lg:block absolute rounded-full border-2 border-studio-blue" style={{ 
              width: '280px', 
              height: '280px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}></div>
            
            {/* Medium circle */}
            <div className="absolute rounded-full border-2 border-studio-blue lg:hidden" style={{ 
              width: '260px', 
              height: '260px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}></div>
            <div className="hidden lg:block absolute rounded-full border-2 border-studio-blue" style={{ 
              width: '340px', 
              height: '340px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}></div>
            
            {/* Large circle */}
            <div className="absolute rounded-full border-2 border-studio-blue lg:hidden" style={{ 
              width: '300px', 
              height: '300px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}></div>
            <div className="hidden lg:block absolute rounded-full border-2 border-studio-blue" style={{ 
              width: '400px', 
              height: '400px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-0">
          {/* Title */}
          <h1 className="font-proxima-wide font-bold text-studio-blue uppercase text-center lg:text-left mb-12 text-[32px] lg:text-[64px]" style={{ lineHeight: '1.1' }}>
            meet our<br />inner circle
          </h1>
          
          {/* Images and Subheading */}
          <div className="flex flex-col lg:flex-row items-start gap-8 mt-56 lg:mt-0">
            {/* Left Inner Circle Image */}
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <div style={{ maxWidth: '675px', width: '100%' }}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/process/inner-circle1.jpg`}
                  alt="Inner circle team member 1"
                  className="w-full object-cover"
                />
                <div className="bg-studio-blue px-6 pb-6 pt-8 text-left" style={{ height: '160px' }}>
                  <h3 className="text-studio-orange font-lovtony -mb-4 -mt-4" style={{ fontSize: '108px', lineHeight: '0.7' }}>katie gell</h3>
                  <h4 className="text-white font-proxima-semibold font-semibold text-xs mb-1 mt-2">East Coast Operations</h4>
                  <p className="text-white font-proxima text-xs mt-2">Wigmaker + Designer + Makeup Artist</p>
                </div>
              </div>
            </div>

            {/* Center Subheading */}
            <div className="lg:w-1/4 text-center lg:relative lg:static absolute lg:top-auto lg:left-auto top-[220px] left-1/2 lg:transform-none -translate-x-1/2 -translate-y-1/2 lg:z-auto z-30" style={{ paddingTop: '30px' }}>
              <p className="font-proxima text-studio-blue text-center uppercase" style={{ fontWeight: 600, fontSize: '24px', lineHeight: '125%', letterSpacing: '4%' }}>
                The trusted<br />hands behind<br />every strand.
              </p>
            </div>

            {/* Right Inner Circle Image */}
            <div className="lg:w-1/2">
              <div style={{ maxWidth: '675px', width: '100%' }}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/process/inner-circle2.jpg`}
                  alt="Inner circle team member 2"
                  className="w-full object-cover"
                />
                <div className="bg-studio-blue px-6 pb-6 pt-8 text-left" style={{ height: '160px' }}>
                  <h3 className="text-studio-orange font-lovtony -mb-4 -mt-4" style={{ fontSize: '108px', lineHeight: '0.7' }}>mandy lyons</h3>
                  <h4 className="text-white font-proxima-semibold font-semibold text-xs mb-1 mt-2">West Coast Operations</h4>
                  <p className="text-white font-proxima text-xs mt-2">Wigmaker + Hairstylist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProcessPage;