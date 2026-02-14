export type Hotel = {
  id: number;
  name: string;
  location: string;
  description: string;
  pricePerNight: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  roomType: string;
  capacity: string;
};

export default Hotel;
