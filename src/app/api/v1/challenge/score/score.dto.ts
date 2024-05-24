import { z } from "zod";

export class AddScoreDTO {
  public readonly guest: string;

  static schema = z.object({
    name: z.string({ message: "Name must be a string" }),
    number: z.number({ message: "Number must be a number" }),
  });

  constructor(name: string, number: number) {
    this.guest = `${name}-${number}`;
  }

  static fromObject(object: any): AddScoreDTO {
    return new AddScoreDTO(object.name, object.number);
  }
}
