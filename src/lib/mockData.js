/**
 * Mock data for local development
 * Use when Base44 backend is not available
 */

export const mockDestinations = [
  {
    id: '1',
    name: 'Bali, Indonesia',
    country: 'Indonesia',
    description: 'Experience the tropical paradise of Bali with its stunning temples, rice terraces, and pristine beaches.',
    image_url: 'https://images.unsplash.com/photo-1537225228614-b4c23cbf33d0?w=600',
    featured: true,
    duration_days: 7,
    starting_price: 899,
    highlights: ['Temple tours', 'Beach relaxation', 'Rice paddies', 'Yoga retreats'],
  },
  {
    id: '2',
    name: 'Jaipur, India',
    country: 'India',
    description: 'Discover the magic of India with the iconic Taj Mahal, bustling markets, and UNESCO World Heritage sites.',
    image_url: 'https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=600',
    featured: true,
    duration_days: 8,
    starting_price: 749,
    highlights: ['Taj Mahal', 'Palace tours', 'Local markets', 'Cultural experiences'],
  },
  {
    id: '3',
    name: 'Ho Chi Minh City, Vietnam',
    country: 'Vietnam',
    description: 'Explore the vibrant energy of Vietnam with its halong bay cruise, street food, and ancient temples.',
    image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600',
    featured: false,
    duration_days: 6,
    starting_price: 599,
    highlights: ['Halong Bay', 'Street food', 'Ancient temples', 'Night markets'],
  },
  {
    id: '4',
    name: 'Singapore',
    country: 'Singapore',
    description: 'Modern Asia at its finest with futuristic gardens, incredible food scene, and cutting-edge attractions.',
    image_url: 'https://images.unsplash.com/photo-1512453475589-a0a7feeca89f?w=600',
    featured: true,
    duration_days: 4,
    starting_price: 849,
    highlights: ['Marina Bay', 'Gardens by the Bay', 'Hawker food', 'Shopping malls'],
  },
  {
    id: '5',
    name: 'Dubai, UAE',
    country: 'UAE',
    description: 'Luxury and adventure combined in the gleaming desert city of Dubai with world-class attractions.',
    image_url: 'https://images.unsplash.com/photo-1512453475589-a0a7feeca89f?w=600',
    featured: false,
    duration_days: 5,
    starting_price: 799,
    highlights: ['Burj Khalifa', 'Desert safari', 'Luxury beaches', 'Shopping'],
  },
  {
    id: '6',
    name: 'Kuala Lumpur, Malaysia',
    country: 'Malaysia',
    description: 'Blend of modern and traditional Southeast Asia in a cosmopolitan city surrounded by natural wonders.',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
    featured: false,
    duration_days: 5,
    starting_price: 649,
    highlights: ['Twin towers', 'Night markets', 'Nature reserves', 'Local cuisine'],
  },
];

/**
 * Mock API responses
 */
export const mockApi = {
  async getDestinations() {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDestinations), 500);
    });
  },

  async getDestinationById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const destination = mockDestinations.find(d => d.id === id);
        resolve(destination || null);
      }, 300);
    });
  },

  async submitInquiry(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          createdAt: new Date().toISOString(),
        });
      }, 500);
    });
  },
};

