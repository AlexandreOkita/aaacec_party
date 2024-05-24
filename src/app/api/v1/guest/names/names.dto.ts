import { z } from "zod";

export class PutNamesDTO {
  static schema = z.object({
    names: z.array(
      z.object({
        name: z.string({ message: "Name must be a string" }),
        imgUrl: z.string({ message: "Img must be a string" }),
      })
    ),
  });

  constructor(public readonly names: { name: string; imgUrl: string }[]) {}

  static fromObject(object: any): PutNamesDTO {
    return new PutNamesDTO(object.names);
  }
}
