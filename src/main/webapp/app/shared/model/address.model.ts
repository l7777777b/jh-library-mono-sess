export interface IAddress {
  id?: number;
  address1?: string;
  address2?: string;
  city?: string;
  postcode?: string;
  country?: string;
  customerId?: number;
}

export const defaultValue: Readonly<IAddress> = {};
