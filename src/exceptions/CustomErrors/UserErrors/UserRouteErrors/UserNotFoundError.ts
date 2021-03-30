import BaseError from "../../../BaseError"

export default class UserNotFoundError extends BaseError {
    constructor(message) {
        super(message, "User Not Found", 400, "Username is Wrong ");
    }
}
