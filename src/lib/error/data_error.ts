export class DataError extends Error {
  constructor(public message: string, public document: string) {
    const fullMessage = `Error when trying to handle document: ${document}. ${message}`;
    super(fullMessage);
    this.message = fullMessage;
    this.document = document;
  }
}
