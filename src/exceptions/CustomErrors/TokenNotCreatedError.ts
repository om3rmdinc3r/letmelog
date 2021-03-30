import BaseError from "../BaseError"

export default class TokenNotCreatedError extends BaseError{
    constructor(message)
    {
        super(message, "Token Not Created", 401,"Token Error");
    }
}
