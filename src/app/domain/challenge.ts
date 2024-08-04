export class Challenge {
  constructor(
    public readonly id: string,
    public readonly description: string,
    public readonly points: number,
    public readonly numericId: number,
    public readonly tags: string[],
    public readonly partyId: string
  ) {}
}