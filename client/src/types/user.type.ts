export interface UserT {
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null | undefined;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  username: string;
  cover_photo: string;
  bio: string;
  location: string;
  followers?: string[];
  following?: string[];
}

export interface AuthUser extends UserT {
  id: string;
}

export interface User extends UserT {
  _id: string;
}

export interface Connection {
  _id: string;
  from_user: User;
  to_user: User;
  status: "pending" | "accepted";
  createdAt: Date;
  updatedAt: Date;
}

export interface ConnectionCount {
  pending: number;
  accepted: number;
  followers: number;
  following: number;
}
