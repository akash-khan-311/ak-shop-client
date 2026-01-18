export type Brands = string;

export type TSubCategory = {
  _id: string;
  name: string;
  slug: string;
  brands: Brands[];
};

export type TCategory = {
  _id?: string;
  name: string;
  image: string;
  slug: string;
  subCategories: TSubCategory[];
  isDeleted: boolean;
  published: boolean;
  __v?: number;
  createdAt: string;
  updatedAt: string;
};
