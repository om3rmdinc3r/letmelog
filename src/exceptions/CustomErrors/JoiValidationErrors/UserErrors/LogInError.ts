import BaseError from "../../../BaseError"

export default class LogInError extends BaseError {

    constructor(message) {
        super(message, "Sign In Credential Not Correct", 401, "Sign In Validation Error")
    }
}