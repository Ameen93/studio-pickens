import React from 'react';
import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  const contactInfo = [
    {
      title: 'GENERAL INQUIRIES',
      email: 'hello@studiopickens.com',
      phone: '+1 (555) 123-4567'
    },
    {
      title: 'NEW BUSINESS',
      email: 'projects@studiopickens.com',
      phone: '+1 (555) 123-4568'
    },
    {
      title: 'PRESS & MEDIA',
      email: 'press@studiopickens.com',
      phone: '+1 (555) 123-4569'
    }
  ];

  const officeLocations = [
    {
      city: 'Brooklyn',
      address: '123 Creative Avenue\nBrooklyn, NY 11201',
      phone: '+1 (718) 555-0123'
    },
    {
      city: 'Beverly Hills',
      address: '456 Sunset Boulevard\nBeverly Hills, CA 90210',
      phone: '+1 (310) 555-0456'
    },
    {
      city: 'London',
      address: '789 Soho Square\nLondon W1D 3QZ',
      phone: '+44 20 7555 0789'
    }
  ];

  return (
    <Layout title="Studio Pickens - Contact Us">
      {/* Header Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-proxima font-bold text-4xl md:text-6xl text-studio-blue tracking-studio uppercase mb-8">
              CONTACT US
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-studio-orange to-studio-orange mx-auto mb-8"></div>
            <p className="text-lg text-studio-blue/80 leading-relaxed max-w-2xl mx-auto">
              Ready to bring your creative vision to life? We'd love to hear about your project and explore how we can collaborate.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-proxima font-bold text-2xl md:text-3xl text-studio-blue tracking-studio uppercase mb-8">
                START A CONVERSATION
              </h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-12">
              <div>
                <h2 className="font-proxima font-bold text-2xl md:text-3xl text-studio-blue tracking-studio uppercase mb-8">
                  GET IN TOUCH
                </h2>
                <div className="space-y-8">
                  {contactInfo.map((contact, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-proxima font-bold text-lg text-studio-blue tracking-studio uppercase">
                        {contact.title}
                      </h3>
                      <div className="space-y-1">
                        <a
                          href={`mailto:${contact.email}`}
                          className="block text-studio-blue/80 hover:text-studio-blue transition-colors duration-300"
                        >
                          {contact.email}
                        </a>
                        <a
                          href={`tel:${contact.phone}`}
                          className="block text-studio-blue/80 hover:text-studio-blue transition-colors duration-300"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-proxima font-bold text-lg text-studio-blue tracking-studio uppercase mb-6">
                  OFFICE LOCATIONS
                </h3>
                <div className="space-y-6">
                  {officeLocations.map((office, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-proxima font-bold text-studio text-studio-orange tracking-studio uppercase">
                        {office.city}
                      </h4>
                      <div className="text-studio-blue/80">
                        <p className="whitespace-pre-line">{office.address}</p>
                        <a
                          href={`tel:${office.phone}`}
                          className="hover:text-studio-blue transition-colors duration-300"
                        >
                          {office.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-proxima font-bold text-2xl md:text-3xl text-studio-blue tracking-studio uppercase mb-8">
              BUSINESS HOURS
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-studio-orange to-studio-orange mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-proxima font-bold text-lg text-studio-blue tracking-studio uppercase mb-4">
                BROOKLYN
              </h3>
              <div className="space-y-2 text-studio-blue/80">
                <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div>
              <h3 className="font-proxima font-bold text-lg text-studio-blue tracking-studio uppercase mb-4">
                BEVERLY HILLS
              </h3>
              <div className="space-y-2 text-studio-blue/80">
                <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 5:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div>
              <h3 className="font-proxima font-bold text-lg text-studio-blue tracking-studio uppercase mb-4">
                LONDON
              </h3>
              <div className="space-y-2 text-studio-blue/80">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: By Appointment</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 md:py-24 bg-studio-blue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-proxima font-bold text-2xl md:text-3xl text-white tracking-studio uppercase mb-8">
            URGENT PROJECT SUPPORT
          </h3>
          <p className="text-lg text-white/80 leading-relaxed mb-8">
            For time-sensitive projects or production emergencies, our team is available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15551234570"
              className="inline-flex items-center justify-center font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase bg-white hover:bg-gray-100 px-8 py-4 transition-colors duration-300"
            >
              EMERGENCY HOTLINE
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <a
              href="mailto:urgent@studiopickens.com"
              className="inline-flex items-center justify-center font-proxima font-bold text-studio text-white tracking-studio uppercase border-2 border-white hover:bg-white hover:text-studio-blue px-8 py-4 transition-all duration-300"
            >
              URGENT EMAIL
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;