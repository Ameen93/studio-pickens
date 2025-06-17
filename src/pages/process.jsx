import React from 'react';
import Layout from '../components/Layout';

const ProcessPage = () => {
  return (
    <Layout title="Studio Pickens - Process">
      {/* Process Page Banner */}
      <section 
        className="relative bg-studio-bg flex items-center justify-center w-full overflow-hidden" 
        style={{ 
          height: 'clamp(400px, 45vw, 800px)',
        }}
      >
        {/* Background Image - banner4.png */}
        <div 
          className="absolute z-0"
          style={{
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%) translate(200px, -200px)',
            width: 'clamp(100px, 13.89vw, 200px)',
            height: 'clamp(100px, 13.89vw, 200px)'
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/process/banner/banner4.png`}
            alt="Process background element"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Background Image - banner5.png */}
        <div 
          className="absolute z-0 right-0"
          style={{
            top: 'clamp(3px, 0.35vw, 5px)',
            transform: 'translateX(50px)',
            width: 'clamp(129px, 17.91vw, 258px)',
            height: 'clamp(188px, 26.18vw, 377px)'
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/process/banner/banner5.png`}
            alt="Process background element 2"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Rotating Dashed Circle */}
        <div className="absolute w-full flex justify-center z-10" style={{ top: '60%', transform: 'translateY(-50%)' }}>
          <div 
            className="rounded-full border-2 border-dashed border-studio-blue animate-spin"
            style={{
              width: 'clamp(300px, 35.76vw, 515px)',
              height: 'clamp(300px, 35.76vw, 515px)',
              animationDuration: '60s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite'
            }}
          />
        </div>

        {/* Center Content */}
        <div className="text-center z-20" style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <h1 className="font-proxima-wide font-bold text-studio-blue uppercase" style={{ fontSize: '55px' }}>
            Process
          </h1>
        </div>
      </section>
    </Layout>
  );
};

export default ProcessPage;