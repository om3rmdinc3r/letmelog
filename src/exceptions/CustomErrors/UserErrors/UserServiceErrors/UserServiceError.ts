import BaseError from "../../../BaseError"

export default class UserServiceError extends BaseError {

    constructor(message, serviceType) {
        super(message, serviceType, 400, "Some Error Happened On User Service")
    }
}