

export default SpecialOffer;

export interface SpecialOffer {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  discountedPrice: number;
  image: string;
  rating: number;
  status: 'active' | 'draft';
  views: number;
  likes: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}
 
export type CreateSpecialOfferInput = Omit<SpecialOffer, 'id' | 'createdAt' | 'updatedAt'>;
 
export type UpdateSpecialOfferInput = Partial<CreateSpecialOfferInput>;
 