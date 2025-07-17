import React, { useState } from 'react';
import { AuthProvider, withAuth } from '../contexts/AuthContext';
import AuthHeader from './components/AuthHeader';
import HeroEditor from './components/HeroEditor';
import WorkEditor from './components/WorkEditor';
import ProcessEditor from './components/ProcessEditor';
import StoryEditor from './components/StoryEditor';
import LocationsEditor from './components/LocationsEditor';
import ContactEditor from './components/ContactEditor';
import FAQEditor from './components/FAQEditor';

const AdminAppContent = () => {
  const [currentSection, setCurrentSection] = useState('hero');

  const sections = [
    { id: 'hero', name: 'Hero Section', icon: '🏠' },
    { id: 'work', name: 'Work Gallery', icon: '🎨' },
    { id: 'process', name: 'Process Page', icon: '⚙️' },
    { id: 'story', name: 'Story Page', icon: '📖' },
    { id: 'locations', name: 'Locations', icon: '📍' },
    { id: 'contact', name: 'Contact Page', icon: '📧' },
    { id: 'faq', name: 'FAQ', icon: '❓' },
  ];

  const renderContent = () => {
    switch (currentSection) {
      case 'hero':
        return <HeroEditor />;
      case 'work':
        return <WorkEditor />;
      case 'process':
        return <ProcessEditor />;
      case 'story':
        return <StoryEditor />;
      case 'locations':
        return <LocationsEditor />;
      case 'contact':
        return <ContactEditor />;
      case 'faq':
        return <FAQEditor />;
      default:
        return <div className="p-8">Select a section to edit</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Auth Header */}
      <AuthHeader />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Content Sections</h2>
          </div>
        <nav className="mt-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(section.id)}
              className={`w-full text-left px-6 py-3 flex items-center space-x-3 transition-colors ${
                currentSection === section.id
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl">{section.icon}</span>
              <span>{section.name}</span>
            </button>
          ))}
        </nav>
      </div>

        {/* Main Content */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// Create authenticated version of AdminApp
const AuthenticatedAdminApp = withAuth(AdminAppContent);

// Main AdminApp component with AuthProvider
const AdminApp = () => {
  return (
    <AuthProvider>
      <AuthenticatedAdminApp />
    </AuthProvider>
  );
};

export default AdminApp;