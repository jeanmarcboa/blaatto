export type Product = {
  title: string;
  reviews: number;
  price: number;
  id: string;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
  shopId: string;
};
