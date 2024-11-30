import CardProductDto from './CardProductDto';

export default interface CreateCardDto {
  clientName: string;
  clientAddress: string;
  products: CardProductDto[];
  userId: string;
}
