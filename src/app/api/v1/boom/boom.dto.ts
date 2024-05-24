import { z } from "zod";

export class BoomDTO {
  static schema = z.object({
    name: z.string({ message: "Name must be a string" }),
    imageURL: z.string({ message: "imageURL must be a string" }).url({ message: "imageURL must be a valid url" }),
    partyId: z.string({ message: "PartyId must be a string" }),
  });

  constructor(
    public readonly imageURL: string,
    public readonly name: string,
    public readonly partyId: string,
  ) {}

  static fromObject(object: any): BoomDTO {
    return new BoomDTO(
      object.imageURL,
      object.name,
      object.partyId,
    );
  }
}
