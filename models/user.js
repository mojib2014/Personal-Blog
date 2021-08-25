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
    this.cover_photo = data.cover_photo || "";
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
   * @param {id} id [User id]
   * @param {Object} data [updated data]
   * @returns {Object|error} User [Updated User]
   */
  static async updateUser(id, data) {
    try {
      const condition = pgp.as.format(`WHERE id = ${id} RETURNING *`, { id });
      delete data.id;
      const statement = pgp.helpers.update(data, null, "users") + condition;

      const result = await db.query(statement);

      return result.rows[0];
    } catch (err) {
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
      const statement = `SELECT id, first_name, last_name,
                                email, email_verified,
                                created, modified, last_login,
                                profile_image
                                FROM users WHERE id = $1`;
      const values = [user_id];

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
