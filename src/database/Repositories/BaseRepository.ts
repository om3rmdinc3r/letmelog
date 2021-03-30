import { knex, Knex } from "knex";
import { AsyncKeyword } from "typescript";
import { database } from "../database-config/database.config"
export default class BaseRepository {

    connector: any
    trx: Knex.Transaction;

    constructor() {
        this.connector = knex(database)
    }
}

