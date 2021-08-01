"use strict";
const { Pool } = require("pg");
const config = require("config");

const pool = new Pool({ connectionString: config.get("db") });

module.exports = {
  query: (text, params) => pool.query(text, params),
};
