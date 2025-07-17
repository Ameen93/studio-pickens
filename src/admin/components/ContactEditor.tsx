import React, { useState, useEffect } from 'react';
import { ContactData, Location } from '../types';
import LivePreviewPanel from './LivePreview';

const ContactEditor = () => {
  const [contactData, setContactData] = useState<ContactData>({
    id: 1,
    brooklynEmail: "brooklyn@studiopickens.com",
    beverlyHillsEmail: "beverlyhills@studiopickens.com",
    pressEmail: "press@studiopickens.com",
    phone: "+1 (555) 123-4567",
    locations: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [previewRefresh, setPreviewRefresh] = useState(0);
  const [locationsFromApi, setLocationsFromApi] = useState<Location[]>([]);

  useEffect(() => {
    fetchContactData();
    fetchLocationsData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/contact');
      if (!response.ok) {
        throw new Error('Failed to fetch contact data');
      }
      const data = await response.json();
      setContactData(data);
    } catch (error) {
      console.error('Error fetching contact data:', error);
      setMessage('Error fetching contact data');
    } finally {
      setLoading(false);
    }
  };

  const fetchLocationsData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/locations');
      if (!response.ok) {
        throw new Error('Failed to fetch locations data');
      }
      const data = await response.json();
      setLocationsFromApi(data.locations || []);
    } catch (error) {
      console.error('Error fetching locations data:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`http://localhost:3001/api/contact/${contactData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      
      if (response.ok) {
        setMessage('Contact page updated successfully!');
        setPreviewRefresh(Date.now());
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || 'Failed to save'}`);
      }
    } catch (error) {
      console.error('Error saving contact data:', error);
      setMessage('Error saving changes');
    } finally {
      setSaving(false);
    }
  };

  const handleEmailChange = (field: keyof ContactData, value: string) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const syncLocationEmails = () => {
    // Auto-generate emails based on locations API data
    const updatedLocations = locationsFromApi.map(location => {
      const emailPrefix = location.name.toLowerCase().replace(/\s+/g, '');
      return {
        name: location.name.toUpperCase(),
        email: `${emailPrefix}@studiopickens.com`,
        address: {
          street: location.address.split('\n')[0] || '',
          city: location.address.split('\n')[1] || '',
          state: '',
          zip: ''
        }
      };
    });

    setContactData(prev => ({
      ...prev,
      locations: updatedLocations
    }));

    setMessage('Location emails synced from locations page!');
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) {
    return <div className="p-8">Loading contact data...</div>;
  }

  return (
    <div className="flex h-full">
      {/* Left Column - Editor */}
      <div className="w-1/2 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Contact Page Editor</h2>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}

        <div className="space-y-8">
          {/* Email Settings */}
          <div className="p-6 bg-orange-50 border border-orange-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Contact Emails</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Press Email
                </label>
                <input
                  type="email"
                  value={contactData.pressEmail}
                  onChange={(e) => handleEmailChange('pressEmail', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="press@studiopickens.com"
                />
                <p className="text-sm text-gray-500 mt-1">
                  This email appears in the press section and is clickable for copying
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brooklyn Email
                  </label>
                  <input
                    type="email"
                    value={contactData.brooklynEmail}
                    onChange={(e) => handleEmailChange('brooklynEmail', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="brooklyn@studiopickens.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beverly Hills Email
                  </label>
                  <input
                    type="email"
                    value={contactData.beverlyHillsEmail}
                    onChange={(e) => handleEmailChange('beverlyHillsEmail', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="beverlyhills@studiopickens.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={contactData.phone}
                  onChange={(e) => handleEmailChange('phone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Location Integration */}
          <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Location Integration</h3>
              <button
                onClick={syncLocationEmails}
                className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700"
              >
                Sync from Locations
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h4 className="text-md font-medium text-gray-700 mb-3">
                  Available Locations ({locationsFromApi.length})
                </h4>
                {locationsFromApi.length === 0 ? (
                  <p className="text-gray-500 text-sm">No locations found. Create locations first.</p>
                ) : (
                  <div className="space-y-2">
                    {locationsFromApi.map((location, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="font-medium">{location.name}</span>
                        <span className="text-gray-500">{location.address.split('\n')[0]}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <h4 className="text-md font-medium text-gray-700 mb-3">
                  Contact Page Locations ({contactData.locations.length})
                </h4>
                {contactData.locations.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    No contact locations configured. Use "Sync from Locations" to populate automatically.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {contactData.locations.map((location, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{location.name}</span>
                          <span className="text-blue-600 text-sm">{location.email}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {location.address.street}, {location.address.city}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview Info */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Contact Page Features</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Press email is editable and appears in the press section</p>
              <p>• Location emails are automatically generated from the locations page</p>
              <p>• All emails are clickable for easy copying</p>
              <p>• Contact form functionality is built-in</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Live Preview */}
      <div className="w-1/2 border-l border-gray-300 bg-gray-50 overflow-y-auto">
        <div className="p-6">
          <LivePreviewPanel 
            baseUrl="http://localhost:3000/contact" 
            refreshTrigger={previewRefresh} 
          />
        </div>
      </div>
    </div>
  );
};

export default ContactEditor;