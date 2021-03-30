import { Knex } from "knex";
import * as config from "../../config/env"
import { RequestTable } from "../Enums/RequestTable.enum"

export async function up(knex: Knex): Promise<void> {
    if (knex.schema.hasTable(config.default.req_table)) {
        return knex.schema.createTable(config.default.req_table, (table: Knex.TableBuilder) => {
            table.string(RequestTable.id).notNullable().unique().primary();

            // FK from Users
            table.string(RequestTable.owner_id);
            table.foreign(RequestTable.owner_id).references("user_table.id").onDelete('CASCADE').onUpdate('CASCADE')

            //table.string(RequestTable.name);
            table.string(RequestTable.url);
            table.integer(RequestTable.period);
            table.string(RequestTable.method);
            table.string(RequestTable.type);
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(config.default.req_table)
}

