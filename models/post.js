const pgp = require("pg-promise")({ capSQL: true });
const moment = require("moment");
const db = require("../db");

module.exports = class Post {
  constructor(data = {}) {
    this.title = data.title;
    this.body = data.body;
    this.sub_title = data.sub_title;
    this.created = data.created || moment.utc().toISOString();
    this.modified = data.modified || moment.utc().toISOString();
    this.like_user_id = data.like_user_id || [];
    this.likes = data.likes || 0;
    this.author = data.author;
    this.cover_image = data.cover_image || "";
    this.tag_id = data.tag_id;
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
   * @param {Number} post_id [Post post_id to update]
   * @param {Object} post [Updated post]
   * @returns {Object|null} post [updated Post]
   */
  static async updatePost(post_id, post) {
    try {
      post.modified = moment.utc().toISOString();
      const condition = pgp.as.format(
        `WHERE post_id = ${post_id} RETURNING *`,
        {
          post_id,
        },
      );

      delete post.post_id;

      const statement = pgp.helpers.update(post, null, "posts") + condition;

      const result = await db.query(statement);
      if (result.rows.length) return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  /**
   * Updates a posts's likes
   * @param {String} user_id [User user_id]
   * @param {String} post_id [Post post_id]
   * @returns {Object|Error} post [Update post]
   */
  static async likePost(user_id, post_id) {
    try {
      const statement = `UPDATE posts SET
                          like_user_id = like_user_id || $1, likes = likes + 1
                          WHERE NOT (like_user_id @> $1)
                          AND post_id = ($2) RETURNING *`;
      const values = [[user_id], post_id];

      const result = await db.query(statement, values);

      if (result.rows.length) return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  static async disLikePost(user_id, post_id) {
    try {
      const statement = `UPDATE posts SET like_user_id = array_remove(like_user_id, $1), 
                        likes = likes -1
                        WHERE post_id = $2 RETURNING *`;
      const values = [user_id, post_id];

      const result = await db.query(statement, values);

      if (result.rows.length) return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  /**
   * Removes a post
   * @param {Number} post_id [Post post_id]
   * @returns {Object|Error} post [Deleted post or error]
   */
  static async deletePost(post_id) {
    try {
      const statement = `DELETE FROM posts WHERE post_id = $1 RETURNING *`;
      const values = [post_id];

      const result = await db.query(statement, values);

      if (result.rows.length) return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  /**
   * Removes a post's comments by post_id
   * @param {Number} post_id [Comments post_id]
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

  /**
   *
   * @param {Number} author_id
   * @returns {Array} Posts [Author posts]
   */
  static async getAuthorPosts(author_id) {
    try {
      const statement = `SELECT * FROM posts WHERE author = $1`;
      const values = [author_id];

      const result = await db.query(statement, values);

      return result.rows;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Retrieves a post record by post_id
   * @param {Number} post_id [Post post_id]
   */
  static async getPostById(post_id) {
    try {
      const statement = `SELECT * FROM posts WHERE post_id = $1`;
      const values = [post_id];

      const result = await db.query(statement, values);

      if (result.rows.length) return result.rows[0];
    } catch (err) {
      throw err;
    }
  }
};
