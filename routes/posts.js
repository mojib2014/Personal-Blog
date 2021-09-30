const fs = require("fs");
const express = require("express");
const router = express.Router();
const db = require("../db");
const Tag = require("../models/tag");
const Post = require("../models/post");
const movePostCoverImage = require("../middlewares/movePostCoverImage");
const removePostImage = require("../middlewares/removePostImage");

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.getAllPosts();

    if (!posts) return res.status(404).send("There are no posts!");

    res.send(posts);
  } catch (err) {
    next(err);
  }
});

router.get("/post/:post_id", async (req, res, next) => {
  const { post_id } = req.params;

  try {
    const post = await Post.getPostById(post_id);

    res.send(post);
  } catch (err) {
    next(err);
  }
});

router.get("/author/posts/:post_id", async (req, res, next) => {
  const { post_id } = req.params;

  try {
    const posts = await Post.getAuthorPosts(post_id);

    res.send(posts);
  } catch (err) {
    next(err);
  }
});

router.post("/new", movePostCoverImage, async (req, res, next) => {
  const data = req.data;
  const tag = data.tag;
  try {
    const tagStatement = `SELECT tag, tag_id FROM tags WHERE tag LIKE $1`;
    const values = [tag];
    const tagsResult = await db.query(tagStatement, values);
    // If there is no such tag in db create one record
    if (!tagsResult.rows.length) {
      const tagInstance = new Tag(data);
      const newTag = await tagInstance.createTag();

      // Add tag_id to the new post
      data.tag_id = newTag.tag_id;

      const postInstance = new Post(data);
      const post = await postInstance.createPost();

      return res.send(post);
    }

    data.tag_id = tagsResult.rows[0].tag_id;
    const postInstance = new Post(data);
    const post = await postInstance.createPost(data);

    res.send(post);
  } catch (err) {
    next(err);
  }
});

router.put("/post/update", removePostImage, async (req, res, next) => {
  const data = JSON.parse(req.body.item);
  try {
    const post = await Post.getPostById(data.id);
    if (!post)
      return res.status(404).send("Post with the given ID was not found!");
    // If user uploads a new cover_image remove the old one and add the new one
    req.post = post;
    removePostImage(req, res, next);

    movePostCoverImage(req, req, next);

    const updated = await Post.updatePost(post.post_id, data);

    res.send(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/post/comments/delete/:post_id", async (req, res, next) => {
  const { post_id } = req.params;

  try {
    const post = await Post.getPostById(post_id);
    if (!psot)
      return res.status(404).send("Post with the given ID was not found!");

    const comments = await Post.deletePostComments(post.post_id);

    res.send(comments);
  } catch (err) {
    next(err);
  }
});

router.delete("/post/:post_id", removePostImage, async (req, res, next) => {
  const { post } = req;
  try {
    const deletedPost = await Post.deletePost(post.post_id);

    res.send(deletedPost);
  } catch (err) {
    next(err);
  }
});

router.put("/post/like/:user_id", async (req, res, next) => {
  const { user_id } = req.params;
  const { post_id } = req.body;

  try {
    const post = await Post.getPostById(post_id);
    if (!post)
      return res.status(404).send("Post with the given ID was not found!");

    const updatedPost = await Post.likePost(user_id, post.post_id);

    res.send(updatedPost);
  } catch (err) {
    next(err);
  }
});

router.put("/post/dislike/:user_id", async (req, res, next) => {
  const { user_id } = req.params;
  const { post_id } = req.body;

  try {
    const post = await Post.getPostById(post_id);
    if (!post)
      return res.status(404).send("Post with the given ID was not found!");

    const updatedPost = await Post.disLikePost(user_id, post_id);

    res.send(updatedPost);
  } catch (err) {
    console.log("error: ", err);
    next(err);
  }
});

module.exports = router;
