import dotenv from'dotenv'; 
dotenv.config({path:'.env.local'})

if (!process.env.DATABASE_URL) {
  console.error("❌ ERROR: DATABASE_URL not found in .env file!");
}

export default {
  schema: "prisma/schema.prisma",
  datasource: {
    // This tells Prisma to look into your .env file for the value
    url: process.env.DATABASE_URL,
  },
};