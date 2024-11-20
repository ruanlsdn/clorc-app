export default interface iCardOrder {
  productPrice: number;
  productQuantity: number;
  product: {
    id: string;
    description: string;
  };
}
