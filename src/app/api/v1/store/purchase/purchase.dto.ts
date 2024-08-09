import { z } from "zod";

export class BuyItemDTO {
  public readonly guest: string;
  public readonly itemId: string;

  static schema = z.object({
    name: z.string({ message: "Name must be a string" }),
    number: z.number({ message: "Number must be a number" }),
    itemId: z.string({ message: "ItemId must be a string" }).uuid({ message: "ItemId must be a UUID" }),
  });

  constructor(name: string, number: number, itemId: string) {
    this.guest = `${name}-${number}`;
    this.itemId = itemId;
  }

  static fromObject(object: any): BuyItemDTO {
    return new BuyItemDTO(object.name, object.number, object.itemId);
  }
}
