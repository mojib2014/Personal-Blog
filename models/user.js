"use strict";
const moment = require("moment");
const jwt = require("jsonwebtoken");
const config = require("config");
const pgp = require("pg-promise")({ capSQL: true });
const db = require("../db");

module.exports = class User {
  constructor(data = {}) {
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.email = data.email;
    this.password = data.password;
    this.email_verified = data.email_verified ? "true" : "false";
    this.created = data.created || moment.utc().toISOString();
    this.modified = data.modified || moment.utc().toISOString();
    this.last_login = data.last_login || moment.utc().toISOString();
    this.profile_image = data.profile_image || "";
    this.cover_image = data.cover_image || "";
    this.google_id = data.google_id;
    this.facebook_id = data.facebook_id;
  }

  /**
   * Creates a new users record
   * @returns {Object | null} user [Created user record]
   */
  async register() {
    try {
      const statement =
        pgp.helpers.insert({ ...this }, null, "users") + "RETURNING *";

      const result = await db.query(statement);

      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  /**
   *
   * @param {user_id} user_id [User user_id]
   * @param {Object} data [updated data]
   * @returns {Object|error} User [Updated User]
   */
  static async updateUser(user_id, data) {
    try {
      const condition = pgp.as.format(
        `WHERE user_id = ${user_id} RETURNING *`,
        {
          user_id,
        },
      );

      const statement = pgp.helpers.update(data, null, "users") + condition;

      const result = await db.query(statement);

      return result.rows[0];
    } catch (err) {
      console.log("error: user model", err);
      throw err;
    }
  }

  /**
   * Retrieve a user by email
   * @param {String} userEmail [User email]
   * @return {Object | null} User [User record]
   */
  static async getUserByEmail(email) {
    try {
      const statement = `SELECT * FROM users WHERE email = $1`;
      const values = [email];

      const result = await db.query(statement, values);

      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  /**
   * Retrieves a user with given ID
   * @param {String} user_id [User id]
   * @returns {Object|Error} [User record]
   */
  static async getUserById(user_id) {
    try {
      const statement = `SELECT 
                          user_id, first_name, last_name,
                          email, email_verified,
                          created, modified, last_login,
                          profile_image,
                          cover_image,
                          google_id,
                          facebook_id
                          FROM users WHERE user_id = $1`;
      const values = [user_id];

      const result = await db.query(statement, values);

      if (result.rows.length) return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  /**
   * Retrieves a user record by google_id
   * @param {google_id} google_id
   * @returns {Object || Error}
   */
  static async getUserByGoogleId(google_id) {
    try {
      const statement = `SELECT  
                          user_id, 
                          first_name, 
                          last_name,
                          email, email_verified,
                          created, modified, last_login,
                          profile_image,
                          cover_image,
                          google_id,
                          facebook_id
                          FROM users WHERE google_id = $1`;
      const values = [google_id];

      const result = await db.query(statement, values);

      if (result.rows.length) return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  /**
   * Retrieves a user record by facebook_id
   * @param {facebook_id} facebook_id
   * @returns {Object || Error}
   */
  static async getUserByFacebookId(facebook_id) {
    try {
      const statement = `SELECT  
                          user_id, 
                          first_name, 
                          last_name,
                          email, email_verified,
                          created, modified, last_login,
                          profile_image,
                          cover_image,
                          google_id,
                          facebook_id
                          FROM users WHERE google_id = $1`;
      const values = [facebook_id];

      const result = await db.query(statement, values);

      if (result.rows.length) return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {String}  user_id [user_id]
   * @returns {Array | null} Posts  [User's posts]
   */
  static async getUserPosts(user_id) {
    try {
      const statement = `SELECT * FROM posts WHERE author = $1`;
      const values = [user_id];

      const result = await db.query(statement, values);

      if (result.rows.length) return result.rows;
    } catch (err) {
      throw err;
    }
  }

  static generateAuthToken(user) {
    const token = jwt.sign(user, config.get("jwtPrivateKey"));
    return token;
  }
};
