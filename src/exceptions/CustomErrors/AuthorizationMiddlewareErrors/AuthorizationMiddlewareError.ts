import BaseError from "../../BaseError"

export default class AuthorizationMiddlewareError extends BaseError {
    constructor(message) {
        super(message, "Some Error Happened on Authorization", 401, "Authorization Middleware Error");
    }
}