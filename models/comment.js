const pgp = require("pg-promise")({ capSQL: true });
const db = require("../db");
const moment = require("moment");

module.exports = class Comment {
  constructor(data = {}) {
    this.comment = data.comment;
    this.created = data.created || moment.utc().toISOString();
    this.modified = data.modified || moment.utc().toISOString();
    this.user_id = data.user_id;
    this.post_id = data.post_id;
  }

  /**
   * Creates a new comment record
   * @param {Object} comment [Comment to create]
   * @returns {Object|error} [Created comment]
   */
  async create() {
    try {
      const statement =
        pgp.helpers.insert({ ...this }, null, "comments") + "RETURNING *";

      const result = await db.query(statement);

      if (result.rows.length) return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  /**
   * Updates a comment record
   * @param {String} id      [Comment id]
   * @param {Object} comment [Comment]
   * @returns {Object|Error} [Updated Comment or error]
   */
  static async updateComment(comment_id, comment) {
    try {
      comment.modified = moment.utc().toISOString();

      const condition = pgp.as.format(`WHERE id = ${comment_id} RETURNING *`);
      const statement =
        pgp.helpers.update(comment, null, "comments") + condition;

      const result = await db.query(statement);

      if (result.rows.length) return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  /**
   * Removes a comment with a given ID
   * @param {String} comment_id [Comment id]
   */
  static async deleteComment(comment_id) {
    try {
      const statement = `DELETE FROM comments WHERE id = $1 RETURNING *`;
      const values = [comment_id];

      const result = await db.query(statement, values);

      if (result.rows.length) return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  static async getPostComments(post_id) {
    try {
      const statement = `SELECT * FROM comments WHERE post_id = $1`;
      const values = [post_id];

      const result = await db.query(statement, values);

      if (result.rows.length) return result.rows;
    } catch (err) {
      throw err;
    }
  }
};
