export default interface iProduct {
  id?: string;
  description?: string;
  price?: number;
  countable?: boolean;
  number?: number;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string
}
