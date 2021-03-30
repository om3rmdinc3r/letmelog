import * as config from "../../config/env";
import { knex, Knex } from "knex";

export const database: Knex.Config =
    {
        client: "pg",
        connection: {
            host: config.default.db_host,
            port: parseInt(config.default.db_port),
            user: config.default.db_username,
            password: config.default.db_password,
            database: config.default.db_name
        },
        migrations: {
            directory: "./Migrations"
        },
        seeds: {
            directory: "./Seeds"
        },
    }