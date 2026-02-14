export type Travel = {
  id: number;
  title: string;
  location: string;
  description: string;
  price: number;
  originalPrice: number;
  duration: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  groupSize: string;
};

export type ApiResponse = {
  success: boolean;
  data?: {
    travels: Travel[];  // Always { travels: [...] } structure
  };
  message?: string;
  error?: string;
};

export default Travel;