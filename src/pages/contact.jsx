import React, { useState } from 'react';
import Layout from '../components/Layout';
import { TYPOGRAPHY_CLASSES } from '../constants/typography';
import { ANIMATIONS } from '../constants/animations';

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

  return (
    <Layout 
      title="Studio Pickens - Contact"
      description="Contact Studio Pickens for your next creative project. Professional consultation for film, television, theater, and artistic collaborations."
    >
      <style jsx>{`
        ${ANIMATIONS.keyframes.shake}
      `}</style>
      {/* Header Section */}
      <section className="bg-studio-bg flex items-center pb-12 pt-8 md:pt-[152px]">
        <div className="w-full px-4 md:pl-[152px] md:pr-0">
          <h1 className={`${TYPOGRAPHY_CLASSES.headingPrimary} tracking-wide text-left text-[32px] md:text-[64pt] whitespace-nowrap`}>
            GET IN TOUCH
          </h1>
        </div>
      </section>

      {/* Blue Location Bar */}
      <section className="bg-studio-blue py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            {/* Brooklyn */}
            <div className="text-left md:text-center">
              <div 
                className="flex items-center justify-start md:justify-center mb-4 cursor-pointer"
                onMouseEnter={() => setHoveredLocation('brooklyn')}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => copyToClipboard('brooklyn@studiopickens.com')}
              >
                <div className={`w-6 h-6 rounded-full border-2 mr-3 transition-all duration-300 ${
                  hoveredLocation === 'brooklyn' ? 'border-studio-orange bg-studio-orange' : 'border-studio-orange'
                }`}></div>
                <h2 className={`${TYPOGRAPHY_CLASSES.contactLocation} text-2xl`}>
                  BROOKLYN
                </h2>
              </div>
              <button 
                onClick={() => copyToClipboard('brooklyn@studiopickens.com')}
                className="text-white hover:text-studio-orange transition-colors duration-300 cursor-pointer"
              >
                brooklyn@studiopickens.com
              </button>
            </div>

            {/* Beverly Hills */}
            <div className="text-left md:text-center">
              <div 
                className="flex items-center justify-start md:justify-center mb-4 cursor-pointer"
                onMouseEnter={() => setHoveredLocation('beverlyhills')}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => copyToClipboard('beverlyhills@studiopickens.com')}
              >
                <div className={`w-6 h-6 rounded-full border-2 mr-3 transition-all duration-300 ${
                  hoveredLocation === 'beverlyhills' ? 'border-studio-orange bg-studio-orange' : 'border-studio-orange'
                }`}></div>
                <h2 className={`${TYPOGRAPHY_CLASSES.contactLocation} text-2xl`}>
                  BEVERLY HILLS
                </h2>
              </div>
              <button 
                onClick={() => copyToClipboard('beverlyhills@studiopickens.com')}
                className="text-white hover:text-studio-orange transition-colors duration-300 cursor-pointer"
              >
                beverlyhills@studiopickens.com
              </button>
            </div>

            {/* London */}
            {/* <div className="text-center">
              <div 
                className="flex items-center justify-center mb-4 cursor-pointer"
                onMouseEnter={() => setHoveredLocation('london')}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => copyToClipboard('london@studiopickens.com')}
              >
                <div className={`w-6 h-6 rounded-full border-2 mr-3 transition-all duration-300 ${
                  hoveredLocation === 'london' ? 'border-studio-orange bg-studio-orange' : 'border-studio-orange'
                }`}></div>
                <h2 className={`${TYPOGRAPHY_CLASSES.contactLocation} text-2xl`}>
                  LONDON
                </h2>
              </div>
              <button 
                onClick={() => copyToClipboard('london@studiopickens.com')}
                className="text-white hover:text-studio-orange transition-colors duration-300 cursor-pointer"
              >
                london@studiopickens.com
              </button>
            </div> */}
          </div>
        </div>
      </section>

      {/* Press and Contact Form Section */}
      <section className="bg-studio-bg pt-16 pb-16">
        <div className="w-full px-4 md:px-[152px]">
          {/* Press and Form Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Press */}
            <div className="ml-10">
              <div className="mb-8">
                <h2 className="font-proxima-wide font-bold text-2xl text-studio-blue uppercase tracking-wide mb-4 text-left">
                  PRESS
                </h2>
                <button 
                  onClick={() => copyToClipboard('press@studiopickens.com')}
                  className="font-proxima text-studio-blue hover:text-studio-orange transition-colors duration-300 cursor-pointer"
                >
                  press@studiopickens.com
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
                    <label htmlFor="name" className="block text-sm font-proxima-semibold text-studio-blue uppercase tracking-wide mb-2">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      className={`w-full px-4 py-3 border bg-white text-studio-blue placeholder-gray-400 focus:outline-none transition-all duration-200 ${
                        errors.name ? 'border-studio-orange' : 'border-studio-blue focus:border-studio-blue'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-studio-orange">{errors.name}</p>
                    )}
                  </div>

                  {/* Your Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-proxima-semibold text-studio-blue uppercase tracking-wide mb-2">
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@email.com"
                      className={`w-full px-4 py-3 border bg-white text-studio-blue placeholder-gray-400 focus:outline-none transition-all duration-200 ${
                        errors.email ? 'border-studio-orange' : 'border-studio-blue focus:border-studio-blue'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-studio-orange">{errors.email}</p>
                    )}
                  </div>

                  {/* Reason for Contact */}
                  <div>
                    <label htmlFor="reason" className="block text-sm font-proxima-semibold text-studio-blue uppercase tracking-wide mb-2">
                      REASON FOR CONTACT
                    </label>
                    <div className="relative">
                      <select
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border bg-white text-studio-blue focus:outline-none appearance-none transition-all duration-200 ${
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
                    <label htmlFor="message" className="block text-sm font-proxima-semibold text-studio-blue uppercase tracking-wide mb-2">
                      HOW CAN WE HELP?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your message here."
                      rows="5"
                      className={`w-full px-4 py-3 border bg-white text-studio-blue placeholder-gray-400 focus:outline-none resize-none transition-all duration-200 ${
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
                      className={`font-proxima-wide font-bold uppercase tracking-wide pb-1 transition-all duration-200 ${
                        submitError 
                          ? 'text-studio-orange border-b-2 border-studio-orange animate-bounce' 
                          : isSubmitting
                          ? 'text-gray-400 border-b-2 border-gray-400 cursor-not-allowed'
                          : 'text-studio-blue border-b-2 border-transparent hover:border-studio-orange'
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