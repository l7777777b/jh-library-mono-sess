import { IProduct } from 'app/shared/model/product.model';

export interface IWishList {
  id?: number;
  title?: string;
  restricted?: boolean;
  products?: IProduct[];
  customerId?: number;
}

export const defaultValue: Readonly<IWishList> = {
  restricted: false
};
