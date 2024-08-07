import moment from "moment";

export class Purchase {
    public ts: string;
    constructor(
      public readonly guest: string,
      public readonly user: string,
      public readonly itemId: string,
    ) {
      this.ts = moment().format("YYYY-MM-DDTHH:mm:ss");
    }
  }