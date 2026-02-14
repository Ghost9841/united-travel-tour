export interface Travel {
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
  createdAt: string;
  updatedAt: Date;
}
export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};
