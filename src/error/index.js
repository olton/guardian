export class GuardianError extends Error {
    constructor(message = "", guard = null, value) {
        super(message);

        this.message = message;
        this.name = guard;
        this.value = value;
    }
}