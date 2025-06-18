import React, { useState } from 'react';

const FAQSection = () => {
  const [openItem, setOpenItem] = useState(0); // First item open by default

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? -1 : index);
  };

  const faqItems = [
    "HOW LONG DOES IT TAKE TO CREATE A CUSTOM WIG?",
    "CAN I SEND REFERENCE IMAGES OR INSPIRATION?",
    "WHAT'S THE DIFFERENCE BETWEEN A PRIVATE WIG AND A THEATRICAL ONE?",
    "IS THE HAIR ETHICALLY SOURCED?",
    "DO YOU OFFER VIRTUAL CONSULTATIONS?"
  ];

  const loremText = "Lorem ipsum dolor sit amet consectetur. Et habitant bibendum arcu nec elit eu. Donec quis in neque ligula id nunc in non lacus. Amet sed risus lacinia sed. Quis ultrices vestibulum eleifend dignissim auctor laoreet feugiat. Lorem ipsum dolor sit amet consectetur.";

  return (
    <section className="py-16 px-4 mx-auto" style={{ maxWidth: '1400px' }}>
      <div className="flex flex-col lg:flex-row gap-20">
        {/* Left Column - Title */}
        <div className="lg:w-2/5">
          <h2 className="font-proxima-wide font-bold text-studio-blue uppercase text-left" style={{ fontSize: '54px', lineHeight: '1.1' }}>
            FREQUENTLY<br />ASKED QUESTIONS
          </h2>
        </div>

        {/* Right Column - FAQ Items */}
        <div className="lg:w-3/5">
          <div className="space-y-0">
            {faqItems.map((question, index) => (
              <div key={index} className="border-b border-studio-blue">
                {/* Question Header */}
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full py-6 px-0 flex justify-between items-center text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
                  aria-expanded={openItem === index}
                  aria-controls={`faq-content-${index}`}
                >
                  <span className="font-proxima font-bold text-studio-blue uppercase pr-4" style={{ fontSize: '18px', lineHeight: '1.4' }}>
                    {question}
                  </span>
                  
                  {/* Arrow Icon */}
                  <div 
                    className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                      openItem === index ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    <svg 
                      className="w-5 h-5 text-studio-blue" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 9l-7 7-7-7" 
                      />
                    </svg>
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  id={`faq-content-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItem === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pb-6 pr-10">
                    <p className="font-proxima text-studio-blue" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                      {loremText}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;