import dotenv from "dotenv";
// Ensure env vars are loaded immediately when this file is imported
dotenv.config({ path: ".env.local" }); 

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// 1. Create the connection pool
const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

// 2. Create the SINGLE instance of Prisma
export const prisma = new PrismaClient({ adapter });