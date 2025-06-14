import React, { useState } from 'react';
import Layout from '../components/Layout';
import { SectionHeader, Button } from '../components/ui';

const WorkPage = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const categories = ['ALL', 'FILM & TV', 'MUSIC', 'THEATER', 'COMMERCIAL', 'DOCUMENTARY'];

  const projects = [
    {
      id: 1,
      title: 'MIDNIGHT CHRONICLES',
      category: 'FILM & TV',
      year: '2024',
      image: '/images/work/project-1.jpg',
      description: 'A supernatural thriller series for premium streaming platforms.'
    },
    {
      id: 2,
      title: 'SYMPHONY OF SOUNDS',
      category: 'MUSIC',
      year: '2024',
      image: '/images/work/project-2.jpg',
      description: 'Music video production for Grammy-nominated artist.'
    },
    {
      id: 3,
      title: 'THE LAST ACT',
      category: 'THEATER',
      year: '2023',
      image: '/images/work/project-3.jpg',
      description: 'Broadway production design and creative direction.'
    },
    {
      id: 4,
      title: 'BRAND ELEVATION',
      category: 'COMMERCIAL',
      year: '2024',
      image: '/images/work/project-4.jpg',
      description: 'National advertising campaign for luxury fashion brand.'
    },
    {
      id: 5,
      title: 'VOICES UNHEARD',
      category: 'DOCUMENTARY',
      year: '2023',
      image: '/images/work/project-5.jpg',
      description: 'Award-winning documentary on social justice.'
    },
    {
      id: 6,
      title: 'NEON NIGHTS',
      category: 'FILM & TV',
      year: '2023',
      image: '/images/work/project-6.jpg',
      description: 'Cyberpunk-inspired limited series for streaming.'
    },
    {
      id: 7,
      title: 'ACOUSTIC SESSIONS',
      category: 'MUSIC',
      year: '2024',
      image: '/images/work/project-7.jpg',
      description: 'Intimate performance series for emerging artists.'
    },
    {
      id: 8,
      title: 'SHAKESPEARE REIMAGINED',
      category: 'THEATER',
      year: '2024',
      image: '/images/work/project-8.jpg',
      description: 'Modern adaptation of classic works.'
    },
    {
      id: 9,
      title: 'FUTURE FORWARD',
      category: 'COMMERCIAL',
      year: '2024',
      image: '/images/work/project-9.jpg',
      description: 'Tech startup brand identity and campaign.'
    }
  ];

  const filteredProjects = activeFilter === 'ALL' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <Layout title="Studio Pickens - Our Work">
      {/* Header Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-4">
          <SectionHeader 
            title="OUR WORK"
            subtitle="Explore our portfolio of creative excellence across film, television, music, theater, and commercial projects."
            size="large"
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`font-proxima font-bold text-studio tracking-studio uppercase px-6 py-3 border-2 transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-studio-blue text-white border-studio-blue'
                    : 'text-studio-blue border-studio-blue/20 hover:border-studio-blue hover:bg-studio-blue hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer"
              >
                <div className="aspect-[9/16] rounded-lg overflow-hidden bg-gray-200 mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-proxima font-bold text-lg text-studio-blue tracking-studio uppercase">
                      {project.title}
                    </h3>
                    <span className="font-proxima font-bold text-studio text-studio-blue/60 tracking-studio uppercase">
                      {project.year}
                    </span>
                  </div>
                  <p className="font-proxima font-bold text-studio text-studio-orange tracking-studio uppercase text-sm">
                    {project.category}
                  </p>
                  <p className="text-studio-blue/80 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-16">
            <Button variant="outline" size="lg">
              LOAD MORE PROJECTS
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WorkPage;