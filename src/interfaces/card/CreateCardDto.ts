import CardProductDto from './CardProductDto';

export default interface CreateCardDto {
  clientName: string;
  products: CardProductDto[];
  userId: string;
}
