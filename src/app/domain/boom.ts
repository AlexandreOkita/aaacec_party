import { BoomDTO } from "../api/v1/boom/boom.dto";

export class Boom {
  constructor(
    public readonly imageURL: string,
    public readonly name: string,
    public readonly partyId: string
  ) {}

  get id() {
    return `${this.partyId}-${this.name}`;
  }

  static fromDTO(dto: BoomDTO) {
    return new Boom(dto.imageURL, dto.name, dto.partyId);
  }
}
