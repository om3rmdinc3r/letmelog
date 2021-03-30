import BaseError from "../../../BaseError"

export default class RequestRouteError extends BaseError {
    constructor(message) {
        super(message, "Request Router Error", 400, "Some Error Happened");
    }
}
