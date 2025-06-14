import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const reasonOptions = [
    { value: '', label: 'SELECT REASON FOR CONTACT' },
    { value: 'new-project', label: 'NEW PROJECT INQUIRY' },
    { value: 'collaboration', label: 'COLLABORATION OPPORTUNITY' },
    { value: 'press', label: 'PRESS & MEDIA' },
    { value: 'careers', label: 'CAREER OPPORTUNITIES' },
    { value: 'general', label: 'GENERAL INQUIRY' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name Field */}
      <div>
        <label 
          htmlFor="name" 
          className="block font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase mb-2"
        >
          NAME *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-4 border-2 border-studio-blue/20 rounded-lg focus:border-studio-blue focus:outline-none transition-colors duration-300 bg-white"
          placeholder="YOUR FULL NAME"
        />
      </div>

      {/* Email Field */}
      <div>
        <label 
          htmlFor="email" 
          className="block font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase mb-2"
        >
          EMAIL *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-4 border-2 border-studio-blue/20 rounded-lg focus:border-studio-blue focus:outline-none transition-colors duration-300 bg-white"
          placeholder="YOUR EMAIL ADDRESS"
        />
      </div>

      {/* Reason for Contact */}
      <div>
        <label 
          htmlFor="reason" 
          className="block font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase mb-2"
        >
          REASON FOR CONTACT *
        </label>
        <select
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
          className="w-full px-4 py-4 border-2 border-studio-blue/20 rounded-lg focus:border-studio-blue focus:outline-none transition-colors duration-300 bg-white font-proxima font-bold text-studio tracking-studio uppercase"
        >
          {reasonOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message Field */}
      <div>
        <label 
          htmlFor="message" 
          className="block font-proxima font-bold text-studio text-studio-blue tracking-studio uppercase mb-2"
        >
          MESSAGE *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="6"
          className="w-full px-4 py-4 border-2 border-studio-blue/20 rounded-lg focus:border-studio-blue focus:outline-none transition-colors duration-300 bg-white resize-vertical"
          placeholder="TELL US ABOUT YOUR PROJECT OR INQUIRY..."
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full md:w-auto inline-flex items-center justify-center font-proxima font-bold text-studio text-white tracking-studio uppercase bg-studio-blue hover:bg-studio-blue/80 px-12 py-4 rounded-lg transition-colors duration-300"
        >
          SEND MESSAGE
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default ContactForm;