const pgp = require("pg-promise")({ capSQL: true });
const db = require("../db");

module.exports = class Tag {
  constructor(data = {}) {
    this.tag = data.tag;
  }

  /**
   * It creates a new tag record and return it.
   * @returns {Object || Error} created tag record
   */
  async createTag() {
    try {
      const statement =
        pgp.helpers.insert({ ...this }, null, "tags") + "RETURNING *";

      const result = await db.query(statement);
      if (result.rows.length) return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  static async getTagById(tag_id) {
    try {
      const statement = `SELECT * FROM tags WHERE tag_id = $1`;
      const values = [tag_id];

      const result = await db.query(statement, values);

      if (result.rows.length) return result.rows[0];
    } catch (err) {
      throw err;
    }
  }
};
