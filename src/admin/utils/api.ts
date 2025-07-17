/**
 * Authenticated API utility functions for admin panel
 */

const API_BASE_URL = 'http://localhost:3001/api';
const TOKEN_KEY = 'studio-pickens-auth-token';

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem(TOKEN_KEY);
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  const result = await response.json();
  
  if (!result.success) {
    // Handle token expiration
    if (result.error === 'Invalid or expired token' || result.error === 'Authentication required') {
      // Clear expired token and reload page to trigger authentication
      localStorage.removeItem(TOKEN_KEY);
      
      // Reload page to trigger authentication context
      window.location.reload();
      
      throw new Error('Session expired. Please log in again.');
    }
    
    throw new Error(result.error || 'API request failed');
  }
  
  return result.data;
};

export const apiGet = async (endpoint: string) => {
  return apiRequest(endpoint, { method: 'GET' });
};

export const apiPost = async (endpoint: string, data: any) => {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const apiPut = async (endpoint: string, data: any) => {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const apiDelete = async (endpoint: string) => {
  return apiRequest(endpoint, { method: 'DELETE' });
};

export const checkAuthToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token;
};