import BaseError from "../../../BaseError"

export default class LogServiceError extends BaseError {
    constructor(message, serviceType) {
        super(message, serviceType, 400, "Some Error Happened On Logging Service")
    }
}