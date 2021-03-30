import { knex, Knex } from "knex"
import * as config from "../../../config/env"
import * as uniqid from "uniqid"
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import BaseRepository from '../BaseRepository';
import { UserTable } from "../../Enums/UserTable.enum"
import { IUser } from "../../Interfaces/UserInterface/IUser";
import { IUsers } from "../../Interfaces/UserInterface/IUsers";
import { IRegisterUser } from "../../Interfaces/UserInterface/IRegisterUser";

import DatabaseError from "../../../exceptions/CustomErrors/DatabaseError/DatabaseError";
import TokenNotCreatedError from "../../../exceptions/CustomErrors/TokenNotCreatedError";


///
export default class UserRepository extends BaseRepository {

    private table: string;
    private tableColumns: any;
    constructor() {
        super();
        this.table = config.default.user_table;
        this.tableColumns = {
            id: UserTable.id,
            username: UserTable.username,
            password: UserTable.password
        }
    }

    async GetUserCredentials(): Promise<IUsers> {
        try {
            const users: IUsers = await this.connector(this.table).select();
            return users;
        } catch (e) {
            await this.ThrowDatabaseError(e.message)
        }
    }

    async GetUsers(): Promise<IUsers> {
        try {
            const users: IUsers = await this.connector(this.table).select(UserTable.id, UserTable.username);
            return users;
        } catch (e) {
            await this.ThrowDatabaseError(e.message)
        }
    }
    async FindUserById(id: IUser["id"]): Promise<IUser> {
        try {
            const user: IUser = await this.connector(this.table).select().where({ id: id }).first();
            return user
        } catch (e) {
            await this.ThrowDatabaseError(e.message)
        }
    }
    async FindUserByUsername(username: IUser["username"]) {
        try {
            const res: IUser = await this.connector(this.table).select().where({ username: username }).first();
            return res;
        }
        catch (e) {
            throw new DatabaseError(e.message)
        }
    }
    async AddNewUser(user: IRegisterUser): Promise<IUser> {
        const trx: Knex.Transaction = await this.connector.transaction()
        try {
            const id = uniqid('user-');
            const newUser: IUser = {
                id: id,
                username: user.username,
                password: bcrypt.hashSync(user.password)
            }
            await trx(this.table).insert(newUser)
            trx.commit()
            const result: IUser = await this.connector(this.table).select().where({ id: id }).first();
            return result;
        }
        catch (e) {
            trx.rollback();
            await this.ThrowDatabaseError(e.message)
        }
    }
    async DeletePersonByUsername(username: IUser["username"]): Promise<boolean> {
        const trx: Knex.Transaction = await this.connector.transaction()
        try {
            const res = await trx(this.table).where({ username: username }).del()
            await trx.commit()
            return Boolean(res)

        } catch (e) {
            await trx.rollback()
            throw new DatabaseError(e.message)
        }
    }
    async DeletePersonById(id: IUser["id"]): Promise<boolean> {
        const trx: Knex.Transaction = await this.connector.transaction()
        try {
            const res = await trx(this.table).where({ id: id }).del()
            await trx.commit()
            return Boolean(res)

        } catch (e) {
            await trx.rollback()
            throw new DatabaseError(e.message)
        }
    }

    //Helpers
    async CreateAccessToken(user: IUser): Promise<string> {
        try {
            const payload = {
                username: user.username
            };
            const token = jwt.sign(
                payload,
                config.default.jwtToken,
                { expiresIn: config.default.jwtExpire }
            )
            return token
        }
        catch (e) {
            throw new TokenNotCreatedError(e.message)
        }
    }
    async CreateRefreshToken(user: IUser): Promise<string> {
        try {
            const payload = {
                username: user.username,
            };
            const token = jwt.sign(
                payload,
                config.default.refreshToken,
                { expiresIn: config.default.refreshExpire }
            )
            return token
        }
        catch (e) {
            throw new TokenNotCreatedError(e.message)
        }
    }
    async GetTableCount(): Promise<number> {
        const res = await this.connector(this.table).select().count(this.tableColumns.id);
        return parseInt(res[0].count.toString())
    }
    async ThrowDatabaseError(message: string) {
        throw new DatabaseError(message)
    }
    async IsPasswordValid(userpassword: IUser["password"], validpassword: IUser["password"]) {
        return bcrypt.compareSync(userpassword, validpassword)
    }
    async UserCheck(username: IUser["username"]): Promise<boolean> {
        try {
            return Boolean((await (await this.connector(this.table).select().where({ username: username })).length))
        }
        catch (e) {
            throw new DatabaseError(e.message);
        }
    }
    //     async GetTableColumns() {
    //     //     const res: IUser = this.connector.raw(`SELECT column_name
    //     //     FROM information_schema.columns
    //     //    WHERE table_schema = ?
    //     //      AND table_name   = ?
    //     //        ;` , ['public', this.table])

    //         const rese = this.connector('information_schema.columns').select('column_name').where('table_name', '=', this.table)
    //         return typeof rese
    //     }
}