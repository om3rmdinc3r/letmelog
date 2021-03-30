import UserRepository from "../../database/Repositories/UserRepository/User.Repository"
import UserServiceError from "../../exceptions/CustomErrors/UserErrors/UserServiceErrors/UserServiceError";

import { IUser } from "../../database/Interfaces/UserInterface/IUser"
import { IUsers } from "../../database/Interfaces/UserInterface/IUsers";
import { IRegisterUser } from "../../database/Interfaces/UserInterface/IRegisterUser";


export default class UserService {

    private UserRepository: UserRepository;

    constructor() {
        this.UserRepository = new UserRepository();
    }

    async GetUsers(): Promise<IUsers> {
        try {
            const users: IUsers = await this.UserRepository.GetUsers();
            return users
        } catch (e) {
            throw new UserServiceError(e.message, "GetPersonByName")
        }
    }
    async FindUserById(id: IUser["id"]): Promise<IUser> {
        try {
            const user: IUser = await this.UserRepository.FindUserById(id);
            return user
        } catch (e) {
            throw new UserServiceError(e.message, "FindUserById")
        }
    }
    async FindUserByUsername(username: IUser["username"]): Promise<IUser> {
        try {
            const user: IUser = await this.UserRepository.FindUserByUsername(username);
            return user
        } catch (e) {
            throw new UserServiceError(e.message, "FindUserByUsername")
        }
    }
    async AddNewUser(user: IRegisterUser): Promise<IUser> {
        try {
            const result = await this.UserRepository.AddNewUser(user)
            return result;
        } catch (e) {
            throw new UserServiceError(e.message, "AddNewUser")
        }
    }
    async DeletePersonByUsername(username: IUser["username"]): Promise<boolean> {
        try {
            const result = await this.UserRepository.DeletePersonByUsername(username)
            return result
        } catch (e) {
            throw new UserServiceError(e.message, "AddNewUser")
        }
    }
    async DeletePersonById(id: IUser["id"]): Promise<boolean> {
        try {
            const result = await this.UserRepository.DeletePersonById(id);
            return result;
        } catch (e) {
            throw new UserServiceError(e.message, "DeletePersonById")
        }
    }

    //Helpers
    async CreateAccessToken(user: IUser): Promise<string> {
        try {
            const access = await this.UserRepository.CreateAccessToken(user);
            return access
        } catch (e) {
            throw new UserServiceError(e.message, "Access Token Creator Service is Failed")
        }
    }
    async CreateRefreshToken(user: IUser): Promise<string> {
        try {
            const refresh = await this.UserRepository.CreateRefreshToken(user);
            return refresh
        } catch (e) {
            throw new UserServiceError(e.message, "Refresh Token Creator Service is Failed")
        }
    }
    async IsPasswordValid(userpassword: IUser["password"], validpassword: IUser["password"]): Promise<boolean> {
        try {
            const result = await this.UserRepository.IsPasswordValid(userpassword, validpassword)
            return result
        } catch (e) {
            throw new UserServiceError(e.message, "Password Could not Verified")
        }
    }
    async UserCheck(username: IUser["username"]): Promise<boolean> {
        try {
            return await this.UserRepository.UserCheck(username)
        }
        catch (e) {
            throw new UserServiceError(e.message, "UserCheck")
        }
    }
}
