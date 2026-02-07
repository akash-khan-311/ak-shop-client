export type AddressType = "shipping" | "billing";

export type IUserAddress = {
  _id?: string;
  label?: string;
  type: AddressType;

  division?: string;
  district?: string;
  upazila?: string;
  union?: string;

  fullAddress: string;
  phone?: string;
  isDefault?: boolean;

  createdAt?: string;
  updatedAt?: string;
};

export type TUserAvatar = {
  url: string;
  public_id: string;
};

export type IUser = {
  userId: any;
  _id?: string;
  id: number;
  name: string;
  email?: string;
  phone?: string;
  avatar?: TUserAvatar;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";

  addresses?: IUserAddress[];
  defaultShippingAddressId?: string | null;
  defaultBillingAddressId?: string | null;

  role: "user" | "admin" | "superAdmin";
  status: "active" | "blocked";
  isDeleted: boolean;

  createdAt?: string;
  updatedAt?: string;
};

export type ApiResponse<T> = {
  status?: number;
  success: boolean;
  message?: string;
  data: T;
};

export type AuthTokensResponse = {
  accessToken: string;
  refreshToken: string;
  user: IUser;
};

export type RegisterPayload = {
  name: string;
  email?: string;
  phone?: string;
  password: string;
};

export type UpdateUserPayload = Partial<
  Pick<IUser, "name" | "dateOfBirth" | "gender">
>;
