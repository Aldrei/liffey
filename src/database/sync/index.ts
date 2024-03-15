import db from '@/database/instance';
import { syncRelationships } from '@/database/sync/relationships';
import { syncTables } from '@/database/sync/tables';

export const resetDatabase = async () => {
  console.log('################### ################### ###################');
  console.log('################### STARTING RESET ###################');
  console.log('################### ################### ###################');

  db
    .query('SET FOREIGN_KEY_CHECKS = 0')
    .then(async () => {
      console.log('------------------- ------------------- -------------------');
      console.log('------------------- DROP DATABASE -------------------');
      console.log('------------------- ------------------- -------------------');
      return await db.query('DROP DATABASE IF EXISTS IMOB')
    })
    .then(async () => {
      console.log('------------------- ------------------- -------------------');
      console.log('------------------- CREATING DATABASE -------------------');
      console.log('------------------- ------------------- -------------------');
      return await db.query('CREATE DATABASE IF NOT EXISTS IMOB')
    })
    .then(async () => {
      console.log('------------------- ------------------- -------------------');
      console.log('------------------- USING DATABASE -------------------');
      console.log('------------------- ------------------- -------------------');
      return await db.query('USE IMOB')
    })
    .then(async () => {
      console.log('------------------- ------------------- -------------------');
      console.log('------------------- SYNCING TABLES -------------------');
      console.log('------------------- ------------------- -------------------');
      return await syncTables()
    })
    .then(async () => {
      console.log('------------------- ------------------- -------------------');
      console.log('------------------- SYNCING RELATIONSHIPS -------------------');
      console.log('------------------- ------------------- -------------------');
      return await syncRelationships()
    })
    .then(() => db.query('SET FOREIGN_KEY_CHECKS = 1'))
    .catch((error) => console.error(error))
    .finally(() => {
      console.log('Database reset finished successful.')
      console.log('Finished GID: ' + process.getgid());

      console.log('################### ################### ###################');
      console.log('################### ENDING RESET ###################');
      console.log('################### ################### ###################');
      
      process.exit(process.getgid())
    })
}
