import * as dotenv from "dotenv"
dotenv.config({ path: ".env" })

import { defineConfig } from "drizzle-kit"
export default defineConfig({
  schema: "./lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})
