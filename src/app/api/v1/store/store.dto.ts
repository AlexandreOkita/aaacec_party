import { z } from "zod";

export class NewStoreItemDTO {
  static schema = z.object({
    name: z.string({ message: "Name must be a string" }),
    price: z.number({ message: "Price must be a number" }),
    imageUrl: z.string({ message: "imageURL must be a string" }).url({ message: "imageURL must be a valid url" }),
    partyId: z.string({ message: "PartyId must be a string" }),
  });

  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly imageUrl: string,
    public readonly partyId: string
  ) {}

  static fromObject(object: any): NewStoreItemDTO {
    return new NewStoreItemDTO(
      object.name,
      object.price,
      object.imageUrl,
      object.partyId
    );
  }
}
