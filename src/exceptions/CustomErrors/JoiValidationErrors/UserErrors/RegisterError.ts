import BaseError from "../../../BaseError"

export default class RegisterError extends BaseError {

    constructor(message) {
        super(message, "User Register Cannot Performed", 499, "Register Validation Error")
    }
}
//499 is not a standard HTTP Status Code