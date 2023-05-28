import { Product } from "./Product";

export type Store = {
  id: string;
  name: string;
  url: string;
  products?: Product[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};
