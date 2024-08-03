export class StoreItem {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly imageUrl: string,
    public readonly partyId: string,
  ) {}
}