import { mockStories, mockStudentData } from './mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Flag to use mock data (set to true for demo/development without backend)
const USE_MOCK_DATA = true;

// Get auth token from Clerk if available
const getAuthToken = async () => {
  try {
    // Check if Clerk is available
    if (window.Clerk && window.Clerk.session) {
      const token = await window.Clerk.session.getToken();
      return token;
    }
  } catch (error) {
    console.warn('Could not get auth token:', error);
  }
  return null;
};

export const api = {
  get: async (endpoint) => {
    // Use mock data for stories in development/demo mode
    if (USE_MOCK_DATA) {
      // Simulate network delay for realistic feel
      await new Promise(resolve => setTimeout(resolve, 500));

      if (endpoint === '/stories') {
        return mockStories;
      }

      // Handle story by ID
      const storyMatch = endpoint.match(/\/stories\/(\d+)/);
      if (storyMatch) {
        const storyId = parseInt(storyMatch[1]);
        const story = mockStories.find(s => s.id === storyId);
        if (story) return story;
        throw new Error('Story not found');
      }

      if (endpoint === '/student/profile') {
        return mockStudentData;
      }
    }

    try {
      const token = await getAuthToken();
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_URL}${endpoint}`, { headers });
      if (!res.ok) {
        // Fallback to mock data if API fails
        if (endpoint === '/stories') return mockStories;
        const storyMatch = endpoint.match(/\/stories\/(\d+)/);
        if (storyMatch) {
          const storyId = parseInt(storyMatch[1]);
          const story = mockStories.find(s => s.id === storyId);
          if (story) return story;
        }
        throw new Error('API Error');
      }
      return await res.json();
    } catch (error) {
      console.error("API Get Error:", error);
      // Fallback to mock data
      if (endpoint === '/stories') return mockStories;
      const storyMatch = endpoint.match(/\/stories\/(\d+)/);
      if (storyMatch) {
        const storyId = parseInt(storyMatch[1]);
        const story = mockStories.find(s => s.id === storyId);
        if (story) return story;
      }
      throw error;
    }
  },

  post: async (endpoint, body) => {
    // Mock POST responses
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));

      if (endpoint === '/student/progress') {
        return { ...mockStudentData, ...body };
      }

      if (endpoint === '/student/login') {
        return mockStudentData;
      }

      return { success: true };
    }

    try {
      const token = await getAuthToken();
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('API Error');
      return await res.json();
    } catch (error) {
      console.error("API Post Error:", error);
      throw error;
    }
  }
};
