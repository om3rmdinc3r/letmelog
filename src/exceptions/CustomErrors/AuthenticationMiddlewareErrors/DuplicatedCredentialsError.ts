import BaseError from "../../BaseError"

export default class DuplicatedCredentialsError extends BaseError {

    constructor(message) {
        super(message, "Username or/and Email Already in Use", 409, "Duplicated Username / Email")
    }
}