import React from 'react';
import Layout from '../components/Layout';

const StoryPage = () => {
  const founders = [
    {
      id: 1,
      name: 'SARAH PICKENS',
      title: 'CREATIVE DIRECTOR & FOUNDER',
      image: '/images/team/sarah-pickens.jpg',
      bio: 'With over 15 years in creative direction, Sarah has led award-winning campaigns for major entertainment brands. Her vision drives Studio Pickens\' commitment to creative excellence.'
    },
    {
      id: 2,
      name: 'MARCUS CHEN',
      title: 'EXECUTIVE PRODUCER & CO-FOUNDER',
      image: '/images/team/marcus-chen.jpg',
      bio: 'Marcus brings extensive production expertise from his work on Emmy-nominated series and feature films. His operational leadership ensures flawless project execution.'
    },
    {
      id: 3,
      name: 'ELENA RODRIGUEZ',
      title: 'HEAD OF CREATIVE STRATEGY',
      image: '/images/team/elena-rodriguez.jpg',
      bio: 'Elena\'s strategic insight and creative innovation have shaped campaigns for Grammy-winning artists and Tony Award-winning productions.'
    }
  ];

  return (
    <Layout title="Studio Pickens - Our Story">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-proxima font-bold text-4xl md:text-6xl text-studio-blue tracking-studio uppercase mb-8">
              OUR STORY
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-studio-orange to-studio-orange mx-auto mb-8"></div>
            <p className="text-lg text-studio-blue/80 leading-relaxed max-w-2xl mx-auto">
              Founded on the belief that exceptional creativity requires both vision and meticulous execution.
            </p>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="font-proxima font-bold text-2xl md:text-3xl text-studio-blue tracking-studio uppercase mb-8">
                CREATIVE EXCELLENCE SINCE 2018
              </h2>
              <p className="text-lg text-studio-blue/80 leading-relaxed mb-8">
                Studio Pickens was born from a shared vision to elevate creative storytelling across all mediums. 
                What started as a small collective of passionate creatives in Brooklyn has grown into a 
                multi-disciplinary studio with offices in three major creative hubs.
              </p>
              <p className="text-lg text-studio-blue/80 leading-relaxed mb-8">
                Our journey began with a simple philosophy: every project deserves unwavering attention to detail, 
                innovative thinking, and collaborative partnership. This approach has led us to work with 
                industry leaders across film, television, music, and theater.
              </p>
              <p className="text-lg text-studio-blue/80 leading-relaxed">
                Today, we continue to push creative boundaries while maintaining the personal touch and 
                dedication that defined our early work. Our team of specialists brings diverse expertise 
                to every collaboration, ensuring fresh perspectives and exceptional results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-proxima font-bold text-3xl md:text-4xl text-studio-blue tracking-studio uppercase mb-8">
              MEET THE FOUNDERS
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-studio-orange to-studio-orange mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {founders.map((founder) => (
              <div key={founder.id} className="text-center">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-200 mb-6">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-proxima font-bold text-xl text-studio-blue tracking-studio uppercase mb-2">
                      {founder.name}
                    </h3>
                    <p className="font-proxima font-bold text-studio text-studio-orange tracking-studio uppercase text-sm">
                      {founder.title}
                    </p>
                  </div>
                  <p className="text-studio-blue/80 leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-proxima font-bold text-3xl md:text-4xl text-studio-blue tracking-studio uppercase mb-8">
              OUR VALUES
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-studio-orange to-studio-orange mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'EXCELLENCE',
                description: 'We pursue perfection in every detail, from concept to final delivery.'
              },
              {
                title: 'COLLABORATION',
                description: 'Our best work emerges through genuine partnership with our clients.'
              },
              {
                title: 'INNOVATION',
                description: 'We push creative boundaries while respecting proven fundamentals.'
              },
              {
                title: 'INTEGRITY',
                description: 'Honest communication and ethical practices guide all our relationships.'
              }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-studio-blue flex items-center justify-center mx-auto mb-6">
                  <span className="font-proxima font-bold text-white text-lg">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-proxima font-bold text-xl text-studio-blue tracking-studio uppercase mb-4">
                  {value.title}
                </h3>
                <p className="text-studio-blue/80 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-studio-blue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-proxima font-bold text-3xl md:text-4xl text-white tracking-studio uppercase mb-8">
            BECOME PART OF OUR STORY
          </h3>
          <p className="text-lg text-white/80 leading-relaxed mb-12">
            Let's create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase bg-white hover:bg-gray-100 px-8 py-4 transition-colors duration-300"
            >
              START A PROJECT
            </a>
            <a
              href="/work"
              className="inline-flex items-center justify-center font-proxima font-bold text-studio text-white tracking-studio uppercase border-2 border-white hover:bg-white hover:text-studio-blue px-8 py-4 transition-all duration-300"
            >
              VIEW OUR WORK
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StoryPage;