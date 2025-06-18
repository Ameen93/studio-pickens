import React from 'react';
import Layout from '../components/Layout';
import FAQItem from '../components/FAQItem';
import FAQSection from '../components/FAQSection';

const FAQPage = () => {
  const faqs = [
    {
      question: 'What types of projects does Studio Pickens work on?',
      answer: 'We specialize in creative projects across film and television, music videos, theater productions, commercial campaigns, and documentaries. Our multidisciplinary approach allows us to handle everything from concept development to final delivery, regardless of scale or complexity.'
    },
    {
      question: 'How do you approach new client projects?',
      answer: 'Every project begins with our comprehensive discovery process. We conduct strategic briefing sessions to understand your vision, goals, and challenges. This is followed by concept development, detailed planning, and collaborative execution. Our proven methodology ensures exceptional results while maintaining clear communication throughout.'
    },
    {
      question: 'What is your typical project timeline?',
      answer: 'Project timelines vary significantly based on scope and complexity. A music video might take 2-4 weeks from concept to completion, while a television series could span several months. During our initial consultation, we provide detailed timelines with key milestones and delivery dates tailored to your specific needs.'
    },
    {
      question: 'Do you work with international clients?',
      answer: 'Absolutely. With studios in Brooklyn, Beverly Hills, and London, we serve clients globally. Our international network allows us to provide local expertise with global reach, including multi-language support, cultural liaison services, and coordination across different time zones and regulatory requirements.'
    },
    {
      question: 'What is included in your post-production services?',
      answer: 'Our comprehensive post-production suite includes editorial services, color grading, sound design, visual effects, motion graphics, and final delivery in all required formats. We use industry-standard software and cutting-edge technology to ensure the highest quality results for every project.'
    },
    {
      question: 'How do you handle budget and pricing?',
      answer: 'We provide transparent, detailed proposals based on your specific requirements. Our pricing structure accounts for all aspects of production, from pre-production planning through final delivery. We work within your budget constraints while maintaining our commitment to creative excellence and never compromise on quality.'
    },
    {
      question: 'Can you accommodate rush projects or tight deadlines?',
      answer: 'Yes, we understand that creative industries often require fast turnarounds. Our team is experienced in managing accelerated timelines without sacrificing quality. We maintain 24/7 emergency support for urgent projects and can deploy additional resources when needed to meet critical deadlines.'
    },
    {
      question: 'What makes Studio Pickens different from other creative agencies?',
      answer: 'Our unique combination of strategic thinking, creative excellence, and flawless execution sets us apart. We maintain boutique-level attention to detail while offering the capabilities of a full-service studio. Our collaborative approach ensures that every client receives personalized service and innovative solutions tailored to their specific needs.'
    }
  ];

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