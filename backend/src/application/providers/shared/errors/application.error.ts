export class ApplicationError extends Error {
    constructor(message = "Application Error") {
        super(message);
        this.name = "ApplicationError";
    }
}