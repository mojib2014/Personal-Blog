const pgp = require("pg-promise")({ capSQL: true });
const db = require("../db");
const moment = require("moment");

module.exports = class Post {
  constructor(data = {}) {
    this.title = data.title;
    this.body = data.body;
    this.sub_title = data.sub_title;
    this.created = data.created || moment.utc().toISOString();
    this.modified = data.modified || moment.utc().toISOString();
    this.liked = data.liked || "false";
    this.like_user_id = data.like_user_id || [];
    this.likes = data.likes || 0;
    this.author = data.author;
    this.cover_image = data.cover_image;
  }

  /**
   * Create a new post
   * @param {Object} post [Post to create]
   * @returns {Object | null} post [Create Post record]
   */
  async createPost() {
    try {
      const statement =
        pgp.helpers.insert({ ...this }, null, "posts") + "RETURNING *";

      const result = await db.query(statement);

      if (result.rows.length) return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  /**
   * Updates a post record
   * @param {Number} id [Post id to update]
   * @param {Object} post [Updated post]
   * @returns {Object|null} post [updated Post]
   */
  static async updatePost(id, post) {
    try {
      post.modified = moment.utc().toISOString();

      const condition = pgp.as.format(`WHERE id = ${id} RETURNING *`, { id });
      const statement = pgp.helpers.update(post, null, "posts") + condition;

      const result = await db.query(statement);

      if (result.rows.length) return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  /**
   * Updates a posts's likes
   * @param {String} user_id [User id]
   * @param {String} post_id [Post id]
   * @returns {Object|Error} post [Update post]
   */
  static async likePost(user_id, post_id) {
    try {
      const statement = `UPDATE posts SET
                          like_user_id = like_user_id || $1, likes = likes + 1
                          WHERE NOT (like_user_id @> $1)
                          AND id = ($2) RETURNING *`;
      const values = [[user_id], post_id];

      const result = await db.query(statement, values);

      if (result.rows.length) return result.rows[0];
    } catch (err) {
      console.log("like: ", err);
      throw err;
    }
  }

  static async disLikePost(user_id, post_id) {
    try {
      const statement = `UPDATE posts SET like_user_id = array_remove(like_user_id, $1), 
                        likes = likes -1
                        WHERE id = $2 RETURNING *`;
      const values = [user_id, post_id];

      const result = await db.query(statement, values);

      if (result.rows.length) return result.rows[0];
    } catch (err) {
      console.log("disLike: ", err);
      throw err;
    }
  }

  /**
   * Removes a post
   * @param {Number} id [Post id]
   * @returns {Object|Error} post [Deleted post or error]
   */
  static async deletePost(id) {
    try {
      const statement = `DELETE FROM posts WHERE id = $1 RETURNING *`;
      const values = [id];

      const result = await db.query(statement, values);

      if (result.rows.length) return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  /**
   * Removes a post's comments by post_id
   * @param {Number} id [Comments post_id]
   * @returns {Array} comments [Deleted comments]
   */
  static async deletePostComments(post_id) {
    try {
      const statement = `DELETE FROM comments WHERE post_id = $1 RETURNING *`;
      const values = [post_id];

      const result = await db.query(statement, values);

      if (result.rows.length) return result.rows;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Retrieves all posts records
   * @returns {Array} posts [posts records]
   */
  static async getAllPosts() {
    try {
      const statement = `SELECT * FROM posts ORDER BY created DESC`;

      const result = await db.query(statement);

      if (result.rows.length) return result.rows;
    } catch (err) {
      throw err;
    }
  }

  static async getAuthorPosts(author_id) {
    try {
      const statement = `SELECT * FROM posts WHERE author = $1`;
      const values = [author_id];

      const result = await db.query(statement, values);

      if (result.rows.length) return result.rows;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Retrieves a post record by id
   * @param {Number} id [Post id]
   */
  static async getPostById(id) {
    try {
      const statement = `SELECT * FROM posts WHERE id = $1`;
      const values = [id];

      const result = await db.query(statement, values);

      if (result.rows.length) return result.rows[0];
    } catch (err) {
      throw err;
    }
  }
};
