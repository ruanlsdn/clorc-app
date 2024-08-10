import iProduct from "../product/iProduct";

export default interface iCartProduct extends iProduct {
  quantity: number;
}
