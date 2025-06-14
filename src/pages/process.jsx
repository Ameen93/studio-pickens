import React from 'react';
import Layout from '../components/Layout';

const ProcessPage = () => {
  const processSteps = [
    {
      id: 1,
      title: 'DISCOVERY & STRATEGY',
      image: '/images/process/discovery.jpg',
      description: 'We begin every project with deep discovery sessions to understand your vision, goals, and creative challenges. Our strategic approach ensures alignment between creative excellence and business objectives.',
      details: [
        'Creative briefing sessions',
        'Market research and analysis',
        'Stakeholder alignment',
        'Strategic planning'
      ]
    },
    {
      id: 2,
      title: 'CONCEPT DEVELOPMENT',
      image: '/images/process/concept.jpg',
      description: 'Our creative team develops innovative concepts that push boundaries while staying true to your brand. We explore multiple creative directions to find the perfect solution.',
      details: [
        'Ideation workshops',
        'Concept visualization',
        'Creative presentations',
        'Feedback integration'
      ]
    },
    {
      id: 3,
      title: 'PRE-PRODUCTION',
      image: '/images/process/preproduction.jpg',
      description: 'Meticulous planning and preparation ensure smooth execution. We handle all aspects of pre-production with precision and attention to detail.',
      details: [
        'Production planning',
        'Casting and crew selection',
        'Location scouting',
        'Technical preparation'
      ]
    },
    {
      id: 4,
      title: 'PRODUCTION',
      image: '/images/process/production.jpg',
      description: 'Our experienced production team brings concepts to life with cutting-edge technology and creative expertise. We maintain the highest standards throughout the production process.',
      details: [
        'Expert crew management',
        'Quality control',
        'Real-time collaboration',
        'Creative problem solving'
      ]
    },
    {
      id: 5,
      title: 'POST-PRODUCTION',
      image: '/images/process/postproduction.jpg',
      description: 'Our post-production specialists refine and perfect every element to create the final masterpiece. We use the latest technology to achieve stunning results.',
      details: [
        'Editorial excellence',
        'Color grading',
        'Sound design',
        'Visual effects'
      ]
    }
  ];

  return (
    <Layout title="Studio Pickens - Our Process">
      {/* Header Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-proxima font-bold text-4xl md:text-6xl text-studio-blue tracking-studio uppercase mb-8">
              OUR PROCESS
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-studio-orange to-studio-orange mx-auto mb-8"></div>
            <p className="text-lg text-studio-blue/80 leading-relaxed max-w-2xl mx-auto">
              Our proven methodology ensures exceptional results through strategic planning, creative excellence, and meticulous execution.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="space-y-24">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-12 lg:gap-16`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-200">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-studio-orange flex items-center justify-center">
                      <span className="font-proxima font-bold text-white text-lg">
                        {step.id}
                      </span>
                    </div>
                    <h2 className="font-proxima font-bold text-2xl md:text-3xl text-studio-blue tracking-studio uppercase">
                      {step.title}
                    </h2>
                  </div>

                  <p className="text-studio-blue/80 leading-relaxed text-lg">
                    {step.description}
                  </p>

                  <div className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-studio-orange rounded-full flex-shrink-0"></div>
                        <span className="font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-studio-blue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-proxima font-bold text-3xl md:text-4xl text-white tracking-studio uppercase mb-8">
            READY TO START YOUR PROJECT?
          </h3>
          <p className="text-lg text-white/80 leading-relaxed mb-12">
            Let's discuss how our proven process can bring your creative vision to life.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase bg-white hover:bg-gray-100 px-8 py-4 transition-colors duration-300"
          >
            GET STARTED
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default ProcessPage;