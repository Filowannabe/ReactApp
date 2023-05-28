import { Store } from "./Store";

export type Product =  {
  id: string;
  name: string;
  sku: string;
  inventoryQuantity: number;
  inventoryUpdatedTime?: Date;
  storeId: string;
  store?: Store;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
