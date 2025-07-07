export class DomainError extends Error {
    constructor(message = "Domain Error") {
        super(message);
        this.name = "DomainError";
    }
}