import { User } from './user.model';

export interface Answer {
  _id: string;
  content: string;
  author: string |User;
  question: string;
  rating?: number;
  upvotes?: string[];
}