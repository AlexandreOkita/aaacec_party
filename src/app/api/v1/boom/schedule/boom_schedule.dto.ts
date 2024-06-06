import { z } from "zod";

export class BoomScheduleDTO {
  private static DEFAULT_DURATION = 60;

  static schema = z.object({
    name: z.string({ message: "Name must be a string" }),
    partyId: z.string({ message: "PartyId must be a string" }),
    startInSeconds: z
      .number({ message: "StartInSeconds must be a number" })
      .min(10, {
        message: "StartInSeconds must be greater than or equal to 0",
      }),
    duration: z.number({ message: "Duration must be a number" }).optional(),
  });

  constructor(
    public readonly name: string,
    public readonly partyId: string,
    public readonly startInSeconds: number,
    public readonly duration: number
  ) {}

  static fromObject(object: any): BoomScheduleDTO {
    if (object.duration == null) {
      object.duration = BoomScheduleDTO.DEFAULT_DURATION;
    }
    return new BoomScheduleDTO(
      object.name,
      object.partyId,
      object.startInSeconds,
      object.duration
    );
  }
}
