import React from 'react';
import Layout from '../components/Layout';
import LocationCard from '../components/LocationCard';

const LocationsPage = () => {
  const locations = [
    {
      city: 'BROOKLYN',
      country: 'NEW YORK, USA',
      imageSrc: '/images/locations/brooklyn.jpg',
      address: '123 Creative Avenue, Brooklyn, NY 11201',
      mapLink: 'https://maps.google.com/?q=Brooklyn+NY',
      description: 'Our flagship studio in the heart of Brooklyn\'s creative district. This space features state-of-the-art production facilities, editing suites, and collaborative workspaces.',
      amenities: [
        'Production stages',
        'Post-production suites',
        'Creative meeting rooms',
        'Client hospitality area'
      ]
    },
    {
      city: 'BEVERLY HILLS',
      country: 'CALIFORNIA, USA',
      imageSrc: '/images/locations/beverly-hills.jpg',
      address: '456 Sunset Boulevard, Beverly Hills, CA 90210',
      mapLink: 'https://maps.google.com/?q=Beverly+Hills+CA',
      description: 'Located in the entertainment capital of the world, our Beverly Hills studio provides premium services for film and television productions.',
      amenities: [
        'Executive screening rooms',
        'Luxury client lounges',
        'Professional editing bays',
        'Rooftop creative space'
      ]
    },
    {
      city: 'LONDON',
      country: 'UNITED KINGDOM',
      imageSrc: '/images/locations/london.jpg',
      address: '789 Soho Square, London W1D 3QZ',
      mapLink: 'https://maps.google.com/?q=Soho+London+UK',
      description: 'Our European headquarters in London\'s vibrant Soho district, serving international clients and European productions.',
      amenities: [
        'International production support',
        'Multi-language capabilities',
        'European distribution network',
        'Cultural liaison services'
      ]
    }
  ];

  return (
    <Layout title="Studio Pickens - Our Locations">
      {/* Header Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-proxima font-bold text-4xl md:text-6xl text-studio-blue tracking-studio uppercase mb-8">
              OUR LOCATIONS
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-studio-orange to-studio-orange mx-auto mb-8"></div>
            <p className="text-lg text-studio-blue/80 leading-relaxed max-w-2xl mx-auto">
              Three creative hubs strategically positioned to serve our global clientele with local expertise and international reach.
            </p>
          </div>
        </div>
      </section>

      {/* Location Cards Grid */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {locations.map((location, index) => (
              <LocationCard
                key={index}
                city={location.city}
                country={location.country}
                imageSrc={location.imageSrc}
                mapLink={location.mapLink}
                address={location.address}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Location Information */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="space-y-16">
            {locations.map((location, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-12 lg:gap-16`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-200">
                    <img
                      src={location.imageSrc}
                      alt={`${location.city} Studio`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <h2 className="font-proxima font-bold text-3xl md:text-4xl text-studio-blue tracking-studio uppercase mb-2">
                      {location.city}
                    </h2>
                    <p className="font-proxima font-bold text-studio text-studio-orange tracking-studio uppercase">
                      {location.country}
                    </p>
                  </div>

                  <div className="w-16 h-0.5 bg-gradient-to-r from-studio-orange to-studio-orange"></div>

                  <p className="text-studio-blue/80 leading-relaxed text-lg">
                    {location.description}
                  </p>

                  <div>
                    <h3 className="font-proxima font-bold text-lg text-studio-blue tracking-studio uppercase mb-4">
                      STUDIO AMENITIES
                    </h3>
                    <div className="space-y-3">
                      {location.amenities.map((amenity, amenityIndex) => (
                        <div key={amenityIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-studio-orange rounded-full flex-shrink-0"></div>
                          <span className="text-studio-blue/80">
                            {amenity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <a
                      href={location.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase border-2 border-studio-blue px-6 py-3 hover:bg-studio-blue hover:text-white transition-all duration-300"
                    >
                      VIEW ON MAPS
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-studio-blue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-proxima font-bold text-3xl md:text-4xl text-white tracking-studio uppercase mb-8">
            VISIT OUR STUDIOS
          </h3>
          <p className="text-lg text-white/80 leading-relaxed mb-12">
            Schedule a tour of our facilities and meet our creative teams in person.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase bg-white hover:bg-gray-100 px-8 py-4 transition-colors duration-300"
          >
            SCHEDULE A VISIT
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default LocationsPage;