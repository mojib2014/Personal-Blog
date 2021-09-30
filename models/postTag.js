const pgp = require("pg-promise")({ capSQL: true });
const db = require("../db");

module.exports = class PostTag {
  constructor(data = {}) {
    this.post_id = data.post_id;
    this.tag_id = data.tag_id;
  }

  async creatPostTag() {
    try {
      const statement =
        pgp.helpers.insert({ ...this }, null, "posts_tags") + "RETURNING *";

      const result = await db.query(statement);

      if (result.rows.length) return result.rows[0];
    } catch (err) {
      console.log("PostTag model", err);
      throw err;
    }
  }
};
