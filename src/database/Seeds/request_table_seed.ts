import { Knex } from "knex";
import * as config from "../../config/env";
import * as uniqid from "uniqid"
import { IRequest } from "../Interfaces/RequestInterface/IRequest"

export async function seed(knex: Knex): Promise<void> {
    // // Deletes ALL existing entries
    // await knex(config.default.req_table).del();

    // let dummies = []

    // let urls = [
    //     "https://www.ekinokssoftware.com",
    //     "https://www.facebook.com",
    //     "https://twitter.com",
    //     "https://github.com/",
    //     "https://dummie.org",
    //     "https://www.youtube.com/papapap"
    // ]

    // let owner_ids = [
    //     "user-f331mgv8kmjnpn6a",
    // ]
    // for (let owner_id of owner_ids) {
    //     for (let url of urls) {
    //         const req: IRequest = {
    //             id: uniqid("request-"),
    //             owner_id: owner_id,
    //             url: url,
    //             period: Math.floor((1 + Math.random()) * Math.floor(13)),
    //             method: "POST",
    //             type: "HTTPS"
    //         }
    //         dummies.push(req)
    //     }
    // }

    // //Inserts seed entries
    // await knex(config.default.req_table).insert(dummies);
};
