import { User } from './user.model';

export interface Question {
  _id: string;
  title: string;
  description: string;
  author: User;
  rating?: number;
  upvotes?: string[];
}