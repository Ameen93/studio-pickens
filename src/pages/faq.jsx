import React from 'react';
import Layout from '../components/Layout';
import FAQItem from '../components/FAQItem';

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
      {/* Header Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-proxima font-bold text-4xl md:text-6xl text-studio-blue tracking-studio uppercase mb-8">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-studio-orange to-studio-orange mx-auto mb-8"></div>
            <p className="text-lg text-studio-blue/80 leading-relaxed max-w-2xl mx-auto">
              Find answers to common questions about our services, process, and approach to creative collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-proxima font-bold text-2xl md:text-3xl text-studio-blue tracking-studio uppercase mb-8">
              NEED MORE INFORMATION?
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-studio-orange to-studio-orange mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 border border-studio-blue/10 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-studio-blue flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-proxima font-bold text-lg text-studio-blue tracking-studio uppercase mb-4">
                SPEAK WITH OUR TEAM
              </h3>
              <p className="text-studio-blue/80 mb-6">
                Schedule a consultation to discuss your project in detail.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase border-2 border-studio-blue px-6 py-3 hover:bg-studio-blue hover:text-white transition-all duration-300"
              >
                CONTACT US
              </a>
            </div>

            <div className="text-center p-8 border border-studio-blue/10 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-studio-blue flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-proxima font-bold text-lg text-studio-blue tracking-studio uppercase mb-4">
                VIEW OUR PORTFOLIO
              </h3>
              <p className="text-studio-blue/80 mb-6">
                Explore our recent projects and creative solutions.
              </p>
              <a
                href="/work"
                className="inline-flex items-center font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase border-2 border-studio-blue px-6 py-3 hover:bg-studio-blue hover:text-white transition-all duration-300"
              >
                OUR WORK
              </a>
            </div>

            <div className="text-center p-8 border border-studio-blue/10 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-studio-blue flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-proxima font-bold text-lg text-studio-blue tracking-studio uppercase mb-4">
                LEARN OUR PROCESS
              </h3>
              <p className="text-studio-blue/80 mb-6">
                Understand our proven methodology for creative excellence.
              </p>
              <a
                href="/process"
                className="inline-flex items-center font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase border-2 border-studio-blue px-6 py-3 hover:bg-studio-blue hover:text-white transition-all duration-300"
              >
                OUR PROCESS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 md:py-24 bg-studio-blue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-proxima font-bold text-2xl md:text-3xl text-white tracking-studio uppercase mb-8">
            STILL HAVE QUESTIONS?
          </h3>
          <p className="text-lg text-white/80 leading-relaxed mb-12">
            Our team is ready to provide personalized answers and discuss your specific project needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase bg-white hover:bg-gray-100 px-8 py-4 transition-colors duration-300"
            >
              ASK US ANYTHING
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </a>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center justify-center font-proxima font-bold text-studio text-white tracking-studio uppercase border-2 border-white hover:bg-white hover:text-studio-blue px-8 py-4 transition-all duration-300"
            >
              CALL NOW
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQPage;