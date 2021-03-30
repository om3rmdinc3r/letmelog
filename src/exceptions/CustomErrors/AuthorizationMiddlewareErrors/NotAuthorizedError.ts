import BaseError from "../../BaseError"

export default class NotAuthorizedError extends BaseError {
    constructor(message) {
        super(message, "Not Authorized", 401, "Not Authorized Error");
    }
}