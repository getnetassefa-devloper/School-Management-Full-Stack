import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';
import path from 'path';

// This ensures .env.local is loaded even if the CLI misses it
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});