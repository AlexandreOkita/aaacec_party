export class APIError extends Error {
  constructor(public message: string, public code: number) {
    super(message);
    this.message = message;
    this.code = code;
  }

  failMessage() {
    return Response.json({ message: this.message }, { status: this.code });
  }
}
