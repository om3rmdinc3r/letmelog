import BaseError from "../../../BaseError"

export default class RequestNotFoundError extends BaseError {
    constructor(message) {
        super(message, "RequestNotFound", 404, "Request Cannot Found")
    }
}