import { Knex } from "knex";
import * as config from "../../config/env"
import * as uniqid from "uniqid"
import * as bcrypt from "bcryptjs";
import { IUser } from "../Interfaces/UserInterface/IUser";

export async function seed(knex: Knex): Promise<void> {
    // // Deletes ALL existing entries
    // const fillUsers = []
    // for (let i = 0; i < 5; i++) {
    //     const user: IUser = {
    //         id: uniqid('user-'),
    //         username: "admin" + i.toString(),
    //         password: bcrypt.hashSync("admin", 8)
    //     }
    //     fillUsers.push(user)
    // }
    // await knex(config.default.user_table).del();

    // // Inserts seed entries
    // await knex(config.default.user_table).insert(fillUsers);
};
