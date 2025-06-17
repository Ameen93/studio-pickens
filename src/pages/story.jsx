import React from 'react';
import Layout from '../components/Layout';

const StoryPage = () => {

  return (
    <Layout title="Studio Pickens - Story">
      {/* Story Page Banner */}
      <section 
        className="relative bg-studio-bg flex items-center justify-center w-full overflow-hidden" 
        style={{ 
          height: 'clamp(400px, 45vw, 800px)',
        }}
      >
        {/* Blue Outline Circle */}
        <div className="absolute w-full flex justify-center z-10" style={{ top: '60%', transform: 'translateY(-50%)' }}>
          <div 
            className="rounded-full border-2 border-studio-blue"
            style={{
              width: 'clamp(300px, 35.76vw, 515px)',
              height: 'clamp(300px, 35.76vw, 515px)'
            }}
          />
        </div>

        {/* Center Content */}
        <div className="text-center z-20" style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <h1 className="font-proxima-wide font-bold text-studio-blue uppercase" style={{ fontSize: '55px' }}>
            Roots
          </h1>
        </div>
      </section>
    </Layout>
  );
};

export default StoryPage;