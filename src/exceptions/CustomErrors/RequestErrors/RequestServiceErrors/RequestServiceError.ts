import BaseError from "../../../BaseError"

export default class RequestServiceError extends BaseError {
    constructor(message, serviceType) {
        super(message, serviceType, 400, "Some Error Happened On Request Service")
    }
}