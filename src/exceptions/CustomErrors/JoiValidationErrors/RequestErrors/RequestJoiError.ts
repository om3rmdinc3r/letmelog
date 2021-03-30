import BaseError from "../../../BaseError"


export default class RequestJoiError extends BaseError {
    constructor(message) {
        super(message, "Given Request Credentials Wrong", 400, "Adding New Request Error");
    }
}