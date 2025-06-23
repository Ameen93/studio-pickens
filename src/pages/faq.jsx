import React from 'react';
import Layout from '../components/Layout';
import FAQSection from '../components/FAQSection';
import PageBanner from '../components/common/PageBanner';
import { TYPOGRAPHY_CLASSES } from '../constants/typography';

const FAQPage = () => {

  return (
    <Layout title="Studio Pickens - Frequently Asked Questions">
      {/* FAQ Page Banner */}
      <PageBanner 
        backgroundImage="faq/4963b601-8788-4697-b9fc-5a0ce4c4e5b4.jpeg"
        altText="FAQ banner background"
        height="705px"
        objectPosition="50% 50%"
      >
        {/* F A Q Letters */}
        {/* F - Top Left */}
        <div className={`absolute top-16 md:top-12 left-8 md:left-20 ${TYPOGRAPHY_CLASSES.headingPrimary}`} style={{ fontSize: 'clamp(64px, 9.6vw, 101.24px)' }}>
          F
        </div>
        
        {/* A - Below F, offset right past center */}
        <div className={`absolute ${TYPOGRAPHY_CLASSES.headingPrimary} top-[23%] md:top-[28%] left-[80%] md:left-[68%]`} style={{ 
          fontSize: 'clamp(64px, 9.6vw, 101.24px)',
          transform: 'translateX(-50%)'
        }}>
          A
        </div>
        
        {/* Q - Between F and A horizontally, at bottom */}
        <div className={`absolute ${TYPOGRAPHY_CLASSES.headingPrimary} bottom-[30%] md:bottom-[5%] left-[35%] md:left-[40%]`} style={{ 
          fontSize: 'clamp(64px, 9.6vw, 101.24px)',
          transform: 'translateX(-50%)'
        }}>
          Q
        </div>
      </PageBanner>

      {/* FAQ Section */}
      <FAQSection />
    </Layout>
  );
};

export default FAQPage;