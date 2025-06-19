import React from 'react';
import Layout from '../components/Layout';
import FAQSection from '../components/FAQSection';

const FAQPage = () => {

  return (
    <Layout title="Studio Pickens - Frequently Asked Questions">
      {/* FAQ Page Banner */}
      <section 
        className="relative bg-studio-bg flex items-center justify-center w-full overflow-hidden" 
        style={{ 
          height: 'clamp(600px, 67.5vw, 1200px)',
        }}
      >
        {/* Background Image */}
        <img
          src={`${process.env.PUBLIC_URL}/images/faq/4963b601-8788-4697-b9fc-5a0ce4c4e5b4.jpeg`}
          alt="FAQ banner background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ objectPosition: '50% 55%' }}
        />
        
        {/* F A Q Letters */}
        <div className="absolute inset-0 z-10">
          {/* F - Top Left */}
          <div className="absolute top-8 left-8 text-studio-blue font-proxima-wide font-bold uppercase" style={{ fontSize: 'clamp(64px, 9.6vw, 160px)' }}>
            F
          </div>
          
          {/* A - Below F, offset right past center */}
          <div className="absolute text-studio-blue font-proxima-wide font-bold uppercase" style={{ 
            fontSize: 'clamp(64px, 9.6vw, 160px)',
            top: '35%',
            left: '65%',
            transform: 'translateX(-50%)'
          }}>
            A
          </div>
          
          {/* Q - Between F and A horizontally, at bottom */}
          <div className="absolute text-studio-blue font-proxima-wide font-bold uppercase" style={{ 
            fontSize: 'clamp(64px, 9.6vw, 160px)',
            bottom: '15%',
            left: '40%',
            transform: 'translateX(-50%)'
          }}>
            Q
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </Layout>
  );
};

export default FAQPage;