import moment, { Moment } from "moment-timezone";
import { BoomScheduleDTO } from "../api/v1/boom/schedule/boom_schedule.dto";

export class BoomSchedule {
  public startDate: string;
  public endDate: string;

  constructor(
    public readonly name: string,
    public readonly partyId: string,
    public readonly startInSeconds: number,
    public readonly duration: number,
    public readonly imageUrl?: string,
    startDate?: Moment,
    endDate?: Moment
  ) {
    if (startDate && endDate) {
      this.startDate = startDate.format("YYYY-MM-DDTHH:mm:ss");
      this.endDate = endDate.format("YYYY-MM-DDTHH:mm:ss");
    } else {
      this.startDate = moment()
        .add(this.startInSeconds, "seconds")
        .format("YYYY-MM-DDTHH:mm:ss");
      this.endDate = moment()
        .add(this.startInSeconds + this.duration, "seconds")
        .format("YYYY-MM-DDTHH:mm:ss");
    }
  }

  static fromDTO(dto: BoomScheduleDTO): BoomSchedule {
    return new BoomSchedule(
      dto.name,
      dto.partyId,
      dto.startInSeconds,
      dto.duration
    );
  }

  get boomId() {
    return `${this.partyId}-${this.name}`;
  }
}
