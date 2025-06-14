import React from 'react';

const TypographyGuide = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16 bg-studio-bg">
      <div className="space-y-16">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-h1 md:text-h1 sm:text-h1-mobile font-proxima-wide text-studio-blue uppercase mb-4">
            Typography System
          </h1>
          <p className="text-body-lg md:text-body-lg sm:text-body-lg-mobile font-proxima text-studio-blue">
            Complete typography scale for Studio Pickens brand identity
          </p>
        </div>

        {/* Headings Section */}
        <section className="space-y-8">
          <h2 className="text-sub-lg md:text-sub-lg sm:text-sub-lg-mobile font-proxima-wide text-studio-orange uppercase">
            Headings
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-studio-orange pl-6">
              <h1 className="text-h1 md:text-h1 sm:text-h1-mobile font-proxima-wide text-studio-blue uppercase">
                H1 Heading Sample
              </h1>
              <p className="text-small md:text-small sm:text-small-mobile font-proxima text-studio-blue/60 mt-2">
                text-h1 / text-h1-mobile · Proxima Nova Extra Wide · 600/500 · 80px/40px
              </p>
            </div>

            <div className="border-l-4 border-studio-orange pl-6">
              <h2 className="text-h2 md:text-h2 sm:text-h2-mobile font-proxima-wide text-studio-blue uppercase">
                H2 Heading Sample
              </h2>
              <p className="text-small md:text-small sm:text-small-mobile font-proxima text-studio-blue/60 mt-2">
                text-h2 / text-h2-mobile · Proxima Nova Extra Wide · 600/500 · 64px/32px
              </p>
            </div>

            <div className="border-l-4 border-studio-orange pl-6">
              <h3 className="text-h3 md:text-h3 sm:text-h3-mobile font-proxima-wide text-studio-blue uppercase">
                H3 Heading Sample
              </h3>
              <p className="text-small md:text-small sm:text-small-mobile font-proxima text-studio-blue/60 mt-2">
                text-h3 / text-h3-mobile · Proxima Nova Extra Wide · 600/500 · 48px/24px
              </p>
            </div>
          </div>
        </section>

        {/* Subheadings Section */}
        <section className="space-y-8">
          <h2 className="text-sub-lg md:text-sub-lg sm:text-sub-lg-mobile font-proxima-wide text-studio-orange uppercase">
            Subheadings
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-studio-orange pl-6">
              <p className="text-sub-lg md:text-sub-lg sm:text-sub-lg-mobile font-proxima-wide text-studio-blue uppercase">
                Sub Large Sample Text
              </p>
              <p className="text-small md:text-small sm:text-small-mobile font-proxima text-studio-blue/60 mt-2">
                text-sub-lg / text-sub-lg-mobile · Proxima Nova Extra Wide · 500 · 24px/20px
              </p>
            </div>

            <div className="border-l-4 border-studio-orange pl-6">
              <p className="text-sub md:text-sub sm:text-sub-mobile font-proxima-wide text-studio-blue uppercase">
                Sub Regular Sample Text
              </p>
              <p className="text-small md:text-small sm:text-small-mobile font-proxima text-studio-blue/60 mt-2">
                text-sub / text-sub-mobile · Proxima Nova Extra Wide · 500 · 16px/14px
              </p>
            </div>
          </div>
        </section>

        {/* Body Text Section */}
        <section className="space-y-8">
          <h2 className="text-sub-lg md:text-sub-lg sm:text-sub-lg-mobile font-proxima-wide text-studio-orange uppercase">
            Body Text
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-studio-orange pl-6">
              <p className="text-body-lg md:text-body-lg sm:text-body-lg-mobile font-proxima text-studio-blue">
                Body Large: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p className="text-small md:text-small sm:text-small-mobile font-proxima text-studio-blue/60 mt-2">
                text-body-lg / text-body-lg-mobile · Proxima Nova · 400 · 16px/14px
              </p>
            </div>

            <div className="border-l-4 border-studio-orange pl-6">
              <p className="text-body md:text-body sm:text-body-mobile font-proxima text-studio-blue">
                Body Regular: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-small md:text-small sm:text-small-mobile font-proxima text-studio-blue/60 mt-2">
                text-body / text-body-mobile · Proxima Nova · 400 · 14px/12px
              </p>
            </div>

            <div className="border-l-4 border-studio-orange pl-6">
              <p className="text-small md:text-small sm:text-small-mobile font-proxima text-studio-blue">
                Small Text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
              </p>
              <p className="text-small md:text-small sm:text-small-mobile font-proxima text-studio-blue/60 mt-2">
                text-small / text-small-mobile · Proxima Nova · 400 · 12px/10px
              </p>
            </div>
          </div>
        </section>

        {/* Buttons & Interactive Elements */}
        <section className="space-y-8">
          <h2 className="text-sub-lg md:text-sub-lg sm:text-sub-lg-mobile font-proxima-wide text-studio-orange uppercase">
            Buttons & Interactive
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-studio-orange pl-6">
              <div className="flex flex-wrap gap-4 items-center">
                <button className="text-button font-proxima text-white bg-studio-blue px-6 py-3 uppercase">
                  Box Button
                </button>
                <button className="text-button font-proxima text-studio-blue border-2 border-studio-blue px-6 py-3 uppercase hover:bg-studio-blue hover:text-white">
                  Outline Button
                </button>
              </div>
              <p className="text-small md:text-small sm:text-small-mobile font-proxima text-studio-blue/60 mt-2">
                text-button · Proxima Nova · 500 · 13px
              </p>
            </div>

            <div className="border-l-4 border-studio-orange pl-6">
              <a href="#" className="text-button-link font-proxima text-studio-blue underline decoration-studio-orange decoration-2 underline-offset-4">
                Link Button Sample
              </a>
              <p className="text-small md:text-small sm:text-small-mobile font-proxima text-studio-blue/60 mt-2">
                text-button-link · Proxima Nova · 500 · 14px
              </p>
            </div>

            <div className="border-l-4 border-studio-orange pl-6">
              <div className="flex flex-wrap gap-2">
                <span className="text-tag font-proxima text-studio-blue bg-studio-orange/10 px-3 py-1 uppercase">
                  Film & TV
                </span>
                <span className="text-tag font-proxima text-studio-blue bg-studio-orange/10 px-3 py-1 uppercase">
                  Music
                </span>
                <span className="text-tag font-proxima text-studio-blue bg-studio-orange/10 px-3 py-1 uppercase">
                  Theater
                </span>
              </div>
              <p className="text-small md:text-small sm:text-small-mobile font-proxima text-studio-blue/60 mt-2">
                text-tag · Proxima Nova · 500 · 12px
              </p>
            </div>
          </div>
        </section>

        {/* Spacing Examples */}
        <section className="space-y-8">
          <h2 className="text-sub-lg md:text-sub-lg sm:text-sub-lg-mobile font-proxima-wide text-studio-orange uppercase">
            Spacing System (Multiples of 8)
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[2, 4, 6, 8, 10, 12, 16, 20].map((space) => (
              <div key={space} className="text-center">
                <div 
                  className={`bg-studio-orange/20 border-2 border-studio-orange mx-auto`}
                  style={{ width: `${space * 4}px`, height: `${space * 4}px` }}
                ></div>
                <p className="text-small font-proxima text-studio-blue mt-2">
                  {space} = {space * 4}px
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Examples */}
        <section className="space-y-8">
          <h2 className="text-sub-lg md:text-sub-lg sm:text-sub-lg-mobile font-proxima-wide text-studio-orange uppercase">
            Usage Examples
          </h2>
          
          <div className="bg-white p-8 rounded-lg border border-studio-blue/10">
            <h3 className="text-h3 md:text-h3 sm:text-h3-mobile font-proxima-wide text-studio-blue uppercase mb-4">
              Sample Content Block
            </h3>
            <p className="text-sub md:text-sub sm:text-sub-mobile font-proxima-wide text-studio-orange uppercase mb-6">
              Creative Excellence
            </p>
            <p className="text-body-lg md:text-body-lg sm:text-body-lg-mobile font-proxima text-studio-blue mb-6">
              Studio Pickens delivers premium creative solutions for film, television, music, and theater. Our team brings visionary concepts to life with meticulous attention to detail and innovative storytelling.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="text-button font-proxima text-white bg-studio-blue px-6 py-3 uppercase">
                View Our Work
              </button>
              <a href="#" className="text-button-link font-proxima text-studio-blue underline decoration-studio-orange decoration-2 underline-offset-4">
                Learn More
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default TypographyGuide;