import BaseError from "../../BaseError"

export default class CredentialsNotProvided extends BaseError {

    constructor(message)
    {
        super(message, "Credentials Not Found", 403,"Credentials Error");
    }
}
