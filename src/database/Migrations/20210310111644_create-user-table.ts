import { Knex } from "knex";
import * as config from "../../config/env"
import { UserTable } from "../Enums/UserTable.enum"


export async function up(knex: Knex): Promise<void> {
    if (knex.schema.hasTable(config.default.user_table)) {
        return knex.schema.createTable(config.default.user_table, (table: Knex.TableBuilder) => {
            table.string(UserTable.id).notNullable().primary().unique();
            table.string(UserTable.username).notNullable().unique();
            table.string(UserTable.password).notNullable();
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(config.default.user_table);
}

