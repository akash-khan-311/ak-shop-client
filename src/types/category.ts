export type Brands = string;
export type CategoryImage = {
  url: string;
  public_id: string;
};
export type SubCategoryImage = {
  url: string;
  public_id: string;
}
export type TSubCategory = {
  categoryName: any;
  _id: string;
  name: string;
  slug: string;
  image: SubCategoryImage;
  brands: Brands[];
};

export type TCategory = {
  _id?: string;
  name: string;
  image: CategoryImage;
  slug: string;
  subCategories?: TSubCategory[];
  isDeleted: boolean;
  published: boolean;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
};
