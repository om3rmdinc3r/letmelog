import * as dotenv from "dotenv"
dotenv.config();

dotenv.config({ path: "../../.env" });


export default {

    jwtToken: process.env.ACCESS_TOKEN,
    refreshToken: process.env.REFRESH_TOKEN,

    jwtExpire: process.env.ACCESS_EXP_TIME,
    refreshExpire: process.env.REFRESH_EXP_TIME,


    db_client: process.env.DB_CLIENT,
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_port: process.env.DB_PORT,

    user_table: process.env.USER_TABLE,
    log_table: process.env.LOG_TABLE,
    req_table: process.env.REQ_TABLE,

    APP_PORT: process.env.APP_LIVE_PORT,

    session_secret: process.env.SESSION_SECRET,

    cookie_secret: process.env.COOKIE_SECRET
}