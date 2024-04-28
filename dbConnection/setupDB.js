`CREATE DATABASE book_entry;` // SQL Query for database

require("dotenv").config()
const {Pool,types,Client} = require("pg");
const fs = require("fs");
types.setTypeParser(20, parseInt);

const {DB_NAME,DB_PASSWORD} = process.env;

(async function setupDatabase(){
  let rootClient = new Client({
    host: 'localhost',
    user: 'postgres',
    password: DB_PASSWORD,
    database: 'postgres'
  })
  await rootClient.connect();
  let checkDb = await rootClient.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_NAME}'`);
  if(checkDb.rowCount !== 0){
    await rootClient.query(`DROP DATABASE ${DB_NAME}`);
    console.log('db already exists dropping...')
  }
    await rootClient.query(`CREATE DATABASE ${DB_NAME}`);
    await rootClient.end();

    let ddlScripts = fs.readFileSync('./SQL_scripts/schema.sql',{encoding:'utf-8'});
    let dmlScripts = fs.readFileSync('./SQL_scripts/data.sql',{encoding:'utf-8'});
    rootClient = new Client({
      host: 'localhost',
      user: 'postgres',
      password: DB_PASSWORD,
      database: DB_NAME
    });
   await rootClient.connect();
   await rootClient.query(ddlScripts);
   await rootClient.query(dmlScripts);
   await  rootClient.end();
})()

