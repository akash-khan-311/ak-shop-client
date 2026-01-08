export type IImages = [
  {
    thumbnails: string;
    gallery: string[];
  },
];

export type Product = {
  id: number;
  title: string;
  category: string;
  description: string;
  reviews: number;
  price: number;
  discountedPrice: number;
  img: string;
  images?: IImages;
  quantity: number;
};
