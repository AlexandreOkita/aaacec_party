export class PermissionError extends Error {
    constructor(public message: string, public document: string) {
      const fullMessage = `Unable to complete operation when trying to handle document: ${document}. ${message}`;
      super(fullMessage);
      this.message = fullMessage;
      this.document = document;
    }
  }
  