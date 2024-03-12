export class SuccessResponse {
    message: string;
    code: Number;

    constructor(message: string, code: Number) {
        this.message = message;
        this.code = code;
    }
}