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

router.get("/author/posts/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const posts = await Post.getAuthorPosts(id);

    res.send(posts);
  } catch (err) {
    next(err);
  }
});

router.post("/new", async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.item);
    const { file } = req.files;

    file.mv(`${process.cwd()}/client/public/uploads/${file.name}`, (err) => {
      if (err) throw err;
      console.log("file upload success");
    });

    data.cover_image = `/uploads/${file.name}`;

    const postInstance = new Post(data);
    const post = await postInstance.createPost();

    res.send(post);
  } catch (err) {
    next(err);
  }
});

router.put("/post/update", async (req, res, next) => {
  const data = req.body;
  try {
    const post = await Post.getPostById(data.id);
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

    const updatedPost = await Post.likePost(user_id, post.id);

    res.send(updatedPost);
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

    const updatedPost = await Post.disLikePost(user_id, post_id);

    res.send(updatedPost);
  } catch (err) {
    console.log("error: ", err);
    next(err);
  }
});

module.exports = router;
