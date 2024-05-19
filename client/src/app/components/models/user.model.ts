// src/app/components/models/user.model.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface UserWithoutPassword {
  _id: string;
  name: string;
  email: string;
}
