import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, title = 'Studio Pickens', showFooter = true }) => {
  React.useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="min-h-screen bg-studio-bg w-full overflow-x-hidden">
      <Navbar />
      <main className="min-h-screen w-full overflow-x-hidden pt-20">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;