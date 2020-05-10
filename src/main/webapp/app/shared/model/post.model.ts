import { Moment } from 'moment';
import { ITag } from 'app/shared/model/tag.model';

export interface IPost {
  id?: number;
  title?: string;
  content?: any;
  date?: Moment;
  blogName?: string;
  blogId?: number;
  tags?: ITag[];
}

export const defaultValue: Readonly<IPost> = {};
