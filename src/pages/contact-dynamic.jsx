import React, { useState } from 'react';
import Layout from '../components/Layout';
import { TYPOGRAPHY_CLASSES } from '../constants/typography';
import { ANIMATIONS } from '../constants/animations';
import { useContactData, useLocationsData } from '../hooks';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: ''
  });

  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const { contactData, loading: contactLoading, error: contactError } = useContactData();
  const { locationsData, loading: locationsLoading, error: locationsError } = useLocationsData();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.reason) {
      newErrors.reason = 'Please select a reason for contact';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setSubmitError(true);
      setIsSubmitting(false);
      
      // Reset error state after animation
      setTimeout(() => {
        setSubmitError(false);
      }, 600);
      return;
    }
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Form submitted - replace with actual submission logic
    }, 1000);
  };

  const copyToClipboard = (email) => {
    navigator.clipboard.writeText(email).then(() => {
      // Email copied to clipboard successfully
    }).catch(err => {
      console.error('Failed to copy email: ', err);
    });
  };

  // Loading state
  if (contactLoading || locationsLoading) {
    return (
      <Layout title="Studio Pickens - Contact">
        <section className="bg-studio-bg flex items-center pb-16 pt-16 md:pt-[152px] md:pb-12">
          <div className="w-full px-4 md:px-0 md:pr-[152px]">
            <div className="text-center py-16">
              <div className="text-studio-blue">Loading contact information...</div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Error state
  if (contactError || locationsError) {
    return (
      <Layout title="Studio Pickens - Contact">
        <section className="bg-studio-bg flex items-center pb-16 pt-16 md:pt-[152px] md:pb-12">
          <div className="w-full px-4 md:px-0 md:pr-[152px]">
            <div className="text-center py-16">
              <div className="text-red-600">Error loading contact information</div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Studio Pickens - Contact"
      description="Contact Studio Pickens for your next creative project. Professional consultation for film, television, theater, and artistic collaborations."
    >
      <style jsx>{`
        ${ANIMATIONS.keyframes.shake}
      `}</style>
      {/* Header Section */}
      <section className="bg-studio-bg flex items-center pb-16 pt-16 md:pt-[152px] md:pb-12">
        <div className="w-full px-4 md:px-0 md:pr-[152px]">
          <h1 className={`${TYPOGRAPHY_CLASSES.headingPrimary} tracking-wide text-left text-[32px] md:text-[64pt] whitespace-nowrap md:ml-[152px]`}>
            GET IN TOUCH
          </h1>
        </div>
      </section>

      {/* Blue Location Bar */}
      <section className="bg-studio-blue py-16">
        <div className="w-full px-4 md:px-0 md:pr-[152px]">
          <div className="flex flex-col md:flex-row gap-8 md:gap-64">
            {locationsData?.locations
              ?.sort((a, b) => a.order - b.order)
              .map((location) => {
                const locationKey = location.name.toLowerCase().replace(/\s+/g, '');
                const emailAddress = `${locationKey}@studiopickens.com`;
                
                return (
                  <div key={location.id} className="text-left md:text-left md:ml-[152px]">
                    <div 
                      className="flex items-center justify-start mb-4 cursor-pointer"
                      onMouseEnter={() => setHoveredLocation(locationKey)}
                      onMouseLeave={() => setHoveredLocation(null)}
                      onClick={() => copyToClipboard(emailAddress)}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 mr-3 transition-all duration-300 ${
                        hoveredLocation === locationKey ? 'border-studio-orange bg-studio-orange' : 'border-studio-orange'
                      }`}></div>
                      <h2 className={`${TYPOGRAPHY_CLASSES.contactLocation} text-2xl`}>
                        {location.name.toUpperCase()}
                      </h2>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(emailAddress)}
                      className="text-white hover:text-studio-orange transition-colors duration-300 cursor-pointer"
                    >
                      {emailAddress}
                    </button>
                  </div>
                );
              })
            }
          </div>
        </div>
      </section>

      {/* Press and Contact Form Section */}
      <section className="bg-studio-bg pt-16 pb-16">
        <div className="w-full px-4 md:px-0 md:pr-[152px]">
          {/* Press and Form Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Press */}
            <div className="ml-10 md:ml-[152px]">
              <div className="mb-8">
                <h2 className="font-proxima-wide font-bold text-2xl text-studio-blue uppercase tracking-wide mb-4 text-left">
                  PRESS
                </h2>
                <button 
                  onClick={() => copyToClipboard(contactData?.emails?.press || 'press@studiopickens.com')}
                  className="font-proxima text-studio-blue hover:text-studio-orange transition-colors duration-300 cursor-pointer"
                >
                  {contactData?.emails?.press || 'press@studiopickens.com'}
                </button>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <h2 className="font-proxima-wide font-bold text-xl text-studio-blue uppercase tracking-wide mb-8">
                CONTACT US
              </h2>

              {isSubmitted ? (
                /* Success State */
                <div className="flex items-center justify-center h-64">
                  <div className="w-32 h-32 bg-studio-blue rounded-full flex items-center justify-center">
                    <span className="font-proxima-wide font-bold text-studio-orange text-lg uppercase tracking-wide">
                      ALL DONE!
                    </span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Your Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-proxima-semibold font-semibold text-studio-blue uppercase tracking-wide mb-2">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className={`w-full px-4 py-3 border bg-studio-bg text-studio-blue placeholder-gray-400 focus:outline-none transition-all duration-200 font-proxima ${
                        errors.name ? 'border-studio-orange' : 'border-studio-blue focus:border-studio-blue'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-studio-orange">{errors.name}</p>
                    )}
                  </div>

                  {/* Your Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-proxima-semibold font-semibold text-studio-blue uppercase tracking-wide mb-2">
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@email.com"
                      className={`w-full px-4 py-3 border bg-studio-bg text-studio-blue placeholder-gray-400 focus:outline-none transition-all duration-200 font-proxima ${
                        errors.email ? 'border-studio-orange' : 'border-studio-blue focus:border-studio-blue'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-studio-orange">{errors.email}</p>
                    )}
                  </div>

                  {/* Reason for Contact */}
                  <div>
                    <label htmlFor="reason" className="block text-sm font-proxima-semibold font-semibold text-studio-blue uppercase tracking-wide mb-2">
                      REASON FOR CONTACT
                    </label>
                    <div className="relative">
                      <select
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border bg-studio-bg text-studio-blue focus:outline-none appearance-none transition-all duration-200 font-proxima ${
                          errors.reason ? 'border-studio-orange' : 'border-studio-blue focus:border-studio-blue'
                        }`}
                      >
                        <option value="">Topic</option>
                        <option value="custom-wig-consultation">Custom Wig Consultation</option>
                        <option value="film-tv-project">Film & TV Project</option>
                        <option value="editorial-shoot">Editorial Shoot</option>
                        <option value="theater-production">Theater Production</option>
                        <option value="press-inquiry">Press Inquiry</option>
                        <option value="general-inquiry">General Inquiry</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.reason && (
                      <p className="mt-1 text-sm text-studio-orange">{errors.reason}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-proxima-semibold font-semibold text-studio-blue uppercase tracking-wide mb-2">
                      HOW CAN WE HELP?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your message here."
                      rows="5"
                      className={`w-full px-4 py-3 border bg-studio-bg text-studio-blue placeholder-gray-400 focus:outline-none resize-none transition-all duration-200 font-proxima ${
                        errors.message ? 'border-studio-orange' : 'border-studio-blue focus:border-studio-blue'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-studio-orange">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`font-proxima-wide font-bold uppercase tracking-wide pb-0 transition-all duration-200 ${
                        submitError 
                          ? 'text-studio-orange border-b-4 border-studio-orange animate-bounce' 
                          : isSubmitting
                          ? 'text-gray-400 border-b-4 border-gray-400 cursor-not-allowed'
                          : 'text-studio-blue border-b-4 border-transparent hover:border-studio-orange'
                      }`}
                      style={{
                        animation: submitError ? 'shake 0.6s ease-in-out' : 'none'
                      }}
                    >
                      {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;