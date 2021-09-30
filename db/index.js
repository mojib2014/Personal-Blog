"use strict";
const { Pool } = require("pg");
const config = require("config");

const pool = new Pool({ connectionString: config.get("dbUrl") });

pool.on("error", (err) =>
  console.log(`db connection error: ${err} and ${error.stack}`),
);

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
