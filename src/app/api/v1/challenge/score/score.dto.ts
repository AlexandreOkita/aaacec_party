import { z } from "zod";

export class AddScoreDTO {
  public readonly guest: string;
  public readonly score: number;

  static schema = z.object({
    name: z.string({ message: "Name must be a string" }),
    number: z.number({ message: "Number must be a number" }),
    score: z.number({ message: "Score must be a number" }).optional(),
  });

  constructor(name: string, number: number, score: number) {
    this.guest = `${name}-${number}`;
    this.score = score;
  }

  static fromObject(object: any): AddScoreDTO {
    if (object.score == null) {
      object.score = 1;
    }
    return new AddScoreDTO(object.name, object.number, object.score);
  }
}
