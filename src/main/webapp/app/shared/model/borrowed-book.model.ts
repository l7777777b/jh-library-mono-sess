import { Moment } from 'moment';

export interface IBorrowedBook {
  id?: number;
  borrowDate?: Moment;
  bookName?: string;
  bookId?: number;
  clientEmail?: string;
  clientId?: number;
}

export const defaultValue: Readonly<IBorrowedBook> = {};
