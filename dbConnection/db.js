`CREATE DATABASE book_entry;` // SQL Query for database


const {Pool,types,Client} = require("pg");
const fs = require("fs");
types.setTypeParser(20, parseInt);

const {DB_NAME,DB_PASSWORD} = process.env;

const pool = new Pool({
    user: "postgres",
    password: DB_PASSWORD,
    host: "localhost",
    port: 5432,
    max: 100,
    database: DB_NAME,
  });


module.exports = pool;