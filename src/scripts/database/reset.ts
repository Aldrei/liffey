import { resetDatabase } from "@/database/sync"

/**
 * Database
*/
const resolveDatabase = async () => {
  await resetDatabase()
}

resolveDatabase()