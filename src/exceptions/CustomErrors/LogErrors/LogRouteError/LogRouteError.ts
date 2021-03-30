import BaseError from "../../../BaseError"

export default class LogRouteError extends BaseError {

    constructor(message) {
        super(message, "LogRouteError", 400, "Some Error Happened On Log Router")
    }
}