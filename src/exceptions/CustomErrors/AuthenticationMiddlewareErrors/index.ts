import CredentialsNotProvided from "./CredentialsNotProvided"
import UsernameNotFound from "./UsernameNotFound";
import PasswordWrong from "./PasswordWrong";
import AuthenticationError from "./AuthenticationError";
import DuplicatedCredentialsError from "./DuplicatedCredentialsError"


export const errs = {
    CredentialsNotProvided: CredentialsNotProvided,
    UsernameNotFound: UsernameNotFound,
    PasswordWrong: PasswordWrong,
    AuthenticationError: AuthenticationError,

    DuplicatedCredentialsError : DuplicatedCredentialsError
}