import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL;

export const PORT = process.env.PORT || 5000;

export const WEBHOOK_URL = process.env.WEBHOOK_URL;
