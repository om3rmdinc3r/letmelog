import BaseError from "../../BaseError"


export default class UsernameNotFound extends BaseError{

    constructor(message)
    {
        super(message,"Username Not Found", 404,"Username Error");
    }
}