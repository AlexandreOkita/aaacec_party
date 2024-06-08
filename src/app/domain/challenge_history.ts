import moment from "moment";

export class ChallengeHistory {
    public ts: string;
    constructor(
      public readonly guest: string,
      public readonly user: string,
    ) {
      this.ts = moment().format("YYYY-MM-DDTHH:mm:ss");
    }
  }