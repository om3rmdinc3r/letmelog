import BaseError from "../../BaseError"

export default class AuthenticationError extends BaseError{
    constructor(message)
    {
        super(message, "Some Error Happened While Authentication", 400,"Authentication Error");
    }
}
