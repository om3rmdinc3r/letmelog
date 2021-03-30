import BaseError from "../../BaseError"

export default class TokenNotFoundError extends BaseError {
    constructor(message) {
        super(message, "Token Not Found", 401, "Token Not Found Error");
    }
}