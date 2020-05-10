import { IAuthor } from 'app/shared/model/author.model';

export interface IBook {
  id?: number;
  isbn?: string;
  name?: string;
  publishYear?: string;
  copies?: number;
  coverContentType?: string;
  cover?: any;
  publisherName?: string;
  publisherId?: number;
  authors?: IAuthor[];
}

export const defaultValue: Readonly<IBook> = {};
