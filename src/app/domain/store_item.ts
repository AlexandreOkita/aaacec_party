export class StoreItem {
  constructor(
    public readonly id: string,
    public readonly description: string,
    public readonly price: number,
    public readonly imageUrl: string,
    public readonly partyId: string,
  ) {}
}