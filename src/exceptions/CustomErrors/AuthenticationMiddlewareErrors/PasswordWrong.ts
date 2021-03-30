import BaseError from "../../BaseError"


export default class PasswordWrong extends BaseError{

    constructor(message)
    {
        super(message,"Wrong Password", 404,"Password Error");
    }
}