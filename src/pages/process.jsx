import React from 'react';
import Layout from '../components/Layout';

const ProcessPage = () => {
  return (
    <Layout title="Studio Pickens - Process">
      <div className="min-h-screen bg-[#F8F7F7] relative overflow-hidden">
        {/* Arabic Text - Top Left */}
        <div className="absolute top-16 left-8 text-right text-gray-800 text-sm leading-relaxed">
          <div className="mb-2">أمثلة من الشعر المورثاني التقليدي</div>
          <div className="mb-2">1و2و4و6 نماذج خطية مع البصير التسني بأوراقه</div>
          <div>في بعض الحالات فصحت هذا الشعر، بيتين الشعر أن أطوال الجذر المدفق الأول، والأحداث</div>
        </div>

        {/* Hair texture samples - Top area */}
        <div className="absolute top-12 left-1/4 w-24 h-16 bg-gray-300 rounded shadow-md">
          <img src="/images/process/process-page1.jpg" alt="Hair texture 1" className="w-full h-full object-cover rounded" />
        </div>
        <div className="absolute top-8 left-1/3 w-24 h-16 bg-gray-300 rounded shadow-md">
          <img src="/images/process/process-page2.jpg" alt="Hair texture 2" className="w-full h-full object-cover rounded" />
        </div>
        <div className="absolute top-20 left-[42%] w-24 h-16 bg-gray-300 rounded shadow-md">
          <img src="/images/process/process-page3.jpg" alt="Hair texture 3" className="w-full h-full object-cover rounded" />
        </div>

        {/* Second row of samples - Middle left */}
        <div className="absolute top-32 left-8 w-20 h-20 bg-gray-300 rounded shadow-md">
          <img src="/images/process/process-page4.jpg" alt="Hair texture 4" className="w-full h-full object-cover rounded" />
        </div>
        <div className="absolute top-40 left-32 w-20 h-20 bg-gray-300 rounded shadow-md">
          <img src="/images/process/process-page5.jpg" alt="Hair texture 5" className="w-full h-full object-cover rounded" />
        </div>
        <div className="absolute top-44 left-56 w-28 h-12 bg-gray-300 rounded shadow-md">
          <img src="/images/process/process-page6.png" alt="Hair texture 6" className="w-full h-full object-cover rounded" />
        </div>

        {/* Hair styling illustrations - Left side */}
        <div className="absolute bottom-24 left-8 w-48 h-64">
          <img src="/images/process/inner-circle1.jpg" alt="Hair styling illustrations" className="w-full h-full object-cover rounded shadow-md" />
        </div>

        {/* Central PROCESS title */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="font-proxima font-bold text-6xl md:text-8xl text-[#0025B8] tracking-[0.03em] uppercase">
            PROCESS
          </h1>
        </div>

        {/* Curved dotted line */}
        <svg className="absolute top-1/4 left-1/4 w-3/4 h-3/4 pointer-events-none" viewBox="0 0 800 600">
          <path
            d="M50,300 Q200,100 400,200 T750,300 Q600,500 400,400 T50,300"
            stroke="#0025B8"
            strokeWidth="2"
            strokeDasharray="8,8"
            fill="none"
            opacity="0.6"
          />
        </svg>

        {/* Phrenology head diagram - Right side */}
        <div className="absolute top-16 right-16 w-56 h-64">
          <img src="/images/process/inner-circle2.jpg" alt="Phrenology head diagram" className="w-full h-full object-cover rounded shadow-md" />
        </div>

        {/* Additional scattered elements - Right side */}
        <div className="absolute top-80 right-32 w-20 h-20 bg-gray-300 rounded-full shadow-md">
          <img src="/images/process/banner/banner1.png" alt="Process element 1" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="absolute top-96 right-8 w-24 h-16 bg-gray-300 rounded shadow-md">
          <img src="/images/process/banner/banner2.png" alt="Process element 2" className="w-full h-full object-cover rounded" />
        </div>
        <div className="absolute bottom-32 right-20 w-28 h-20 bg-gray-300 rounded shadow-md">
          <img src="/images/process/banner/banner3.png" alt="Process element 3" className="w-full h-full object-cover rounded" />
        </div>

        {/* Bottom right scattered elements */}
        <div className="absolute bottom-16 right-48 w-20 h-20 bg-gray-300 rounded shadow-md">
          <img src="/images/process/banner/banner4.png" alt="Process element 4" className="w-full h-full object-cover rounded" />
        </div>
        <div className="absolute bottom-40 right-72 w-24 h-16 bg-gray-300 rounded shadow-md">
          <img src="/images/process/banner/banner5.png" alt="Process element 5" className="w-full h-full object-cover rounded" />
        </div>
        <div className="absolute bottom-64 right-96 w-20 h-20 bg-gray-300 rounded shadow-md">
          <img src="/images/process/banner/banner6.png" alt="Process element 6" className="w-full h-full object-cover rounded" />
        </div>

        {/* Medical/Scientific diagrams - Far right */}
        <div className="absolute top-1/2 right-8 w-40 h-48 transform -translate-y-1/2">
          <div className="text-xs text-gray-600 leading-tight">
            <div className="mb-2 font-bold">Hyaline layer</div>
            <div className="mb-1">Cortex</div>
            <div className="mb-1">Medulla</div>
            <div className="mb-1">of hair</div>
            <div className="mb-2">Henley's</div>
            <div className="mb-1">layer</div>
            <div className="mb-1">Henley's layer</div>
            <div className="mb-1">Outer or</div>
            <div>dermic coat</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProcessPage;