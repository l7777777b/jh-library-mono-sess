import { Moment } from 'moment';
import { ICategory } from 'app/shared/model/category.model';

export interface IProduct {
  id?: number;
  title?: string;
  keywords?: string;
  description?: string;
  rating?: number;
  dateAdded?: Moment;
  dateModified?: Moment;
  wishListId?: number;
  categories?: ICategory[];
}

export const defaultValue: Readonly<IProduct> = {};
