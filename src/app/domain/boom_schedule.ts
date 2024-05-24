import moment, { Moment } from "moment-timezone";
import { BoomScheduleDTO } from "../api/v1/boom/schedule/boom_schedule.dto";

export class BoomSchedule {
  public startDate: Moment;
  public endDate: Moment;

  constructor(
    public readonly name: string,
    public readonly partyId: string,
    public readonly startInSeconds: number,
    public readonly duration: number,
    startDate?: string,
    endDate?: string
  ) {
    if (startDate && endDate) {
      this.startDate = moment(startDate);
      this.endDate = moment(endDate);
    } else {
      this.startDate = moment()
        .tz("America/Sao_Paulo")
        .add(this.startInSeconds, "seconds")
      this.endDate = moment()
        .tz("America/Sao_Paulo")
        .add(this.startInSeconds + this.duration, "seconds")
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
