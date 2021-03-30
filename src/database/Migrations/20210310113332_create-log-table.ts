import { Knex } from "knex";
import * as config from "../../config/env"
import { LogTable } from "../Enums/LogTable.enum"


export async function up(knex: Knex): Promise<void> {
    if (knex.schema.hasTable(config.default.log_table)) {
        return knex.schema.createTable(config.default.log_table, (table: Knex.TableBuilder) => {

            table.string(LogTable.log_id).notNullable().unique().primary();

            //FK from users
            table.string(LogTable.owner_id);
            table.foreign(LogTable.owner_id).references("user_table.id").onDelete('CASCADE').onUpdate('CASCADE');

            table.string(LogTable.url).notNullable();

            table.time(LogTable.req_time).notNullable().defaultTo(knex.fn.now(0))
            table.date(LogTable.req_date).notNullable().defaultTo(knex.fn.now(0))

            table.integer(LogTable.statusCode).notNullable();

            table.string(LogTable.method);
            table.string(LogTable.type);
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(config.default.log_table)
}

