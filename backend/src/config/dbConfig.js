import { defineConfig } from "prisma/config";
import { DATABASE_URL } from "./serverConfig";

export default defineConfig({
  migrate: {
    datasource: "db",
  },
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});
