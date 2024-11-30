import iCardOrder from './iCardOrder';

export default interface iCard {
  id: string;
  clientName: string;
  clientAddress: string;
  checked: boolean;
  createdAt: Date;
  orders: iCardOrder[];
}
