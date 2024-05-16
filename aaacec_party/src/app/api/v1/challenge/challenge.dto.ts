import { z } from "zod";

export class NewChallengeDTO {
  static schema = z.object({
    description: z.string({ message: "Description must be a string" }),
    points: z.number({ message: "Points must be a number" }),
    numericId: z.number({ message: "NumericId must be a number" }),
    partyId: z.string({ message: "PartyId must be a string" }),
  });

  constructor(
    public readonly description: string,
    public readonly points: number,
    public readonly numericId: number,
    public readonly partyId: string
  ) {}

  static fromObject(object: any): NewChallengeDTO {
    return new NewChallengeDTO(
      object.description,
      object.points,
      object.numericId,
      object.partyId
    );
  }
}
