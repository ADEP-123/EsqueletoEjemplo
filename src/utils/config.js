import dotenv from "dotenv";

dotenv.config();

const config = {
    "server": JSON.parse(process.env.MY_CONFIG),
    "user": process.env.ATLAS_USER,
    "pass": process.env.ATLAS_PASSWORD,
    "db": process.env.ATLAS_DB,
    "jwktKey": process.env.API_JWT_PRIVATE_KEY
}

export default config;