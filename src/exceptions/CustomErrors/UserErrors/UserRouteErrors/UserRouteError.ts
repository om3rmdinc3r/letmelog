import BaseError from "../../../BaseError"

export default class UserRouteError extends BaseError {
    constructor(message) {
        super(message, "User Router Error", 400, "Some Error Happened");
    }
}
