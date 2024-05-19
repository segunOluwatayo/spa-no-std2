import { User } from './user.model';

export interface Comment {
  _id: string;
  content: string;
  author: User;
  answer: string;
}