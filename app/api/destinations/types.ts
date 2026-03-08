export type Destination = {
  id: number;
  name: string;
  country: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  duration: string;
  groupSize: string;
  category: string;
  status: 'active' | 'draft';
  featured: boolean;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
};

export default Destination;
