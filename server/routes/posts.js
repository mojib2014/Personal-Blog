const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.getAllPosts();

    res.send(posts);
  } catch (err) {
    next(err);
  }
});

router.get("/post/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Post.getPostById(id);

    res.send(post);
  } catch (err) {
    next(err);
  }
});

router.post("/new", async (req, res, next) => {
  try {
    const data = req.body;

    const postInstance = new Post(data);
    const post = postInstance.createPost();

    res.send(post);
  } catch (err) {
    next(err);
  }
});

router.put("/post/update/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const post = await Post.getPostById(id);
    if (!post)
      return res.status(404).send("Post with the given ID was not found!");

    const updated = await Post.updatePost(post.id, data);

    res.send(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/post/comments/delete/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Post.getPostById(id);
    if (!psot)
      return res.status(404).send("Post with the given ID was not found!");

    const comments = await Post.deletePostComments(post.id);

    res.send(comments);
  } catch (err) {
    next(err);
  }
});

router.delete("/post/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.getPostById(id);
    if (!post)
      return res.status(404).send("Post with the given ID was not found!");

    const deletedPost = await Post.deletePost(post.id);

    res.send(deletedPost);
  } catch (err) {
    next(err);
  }
});

router.put("/post/like", async (req, res, next) => {
  const { user_id, post_id } = req.body;

  try {
    const post = await Post.getPostById(post_id);
    if (!post)
      return res.status(404).send("Post with the given ID was not found!");

    await Post.likePost(user_id, post.id);

    res.send(post);
  } catch (err) {
    next(err);
  }
});

router.put("/post/dislike", async (req, res, next) => {
  const { user_id, post_id } = req.body;

  try {
    const post = await Post.getPostById(post_id);
    if (!post)
      return res.status(404).send("Post with the given ID was not found!");

    await Post.disLikePost(user_id, post_id);

    res.send(post);
  } catch (err) {
    console.log("error: ", err);
    next(err);
  }
});

module.exports = router;
