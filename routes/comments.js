const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

router.post("/create", async (req, res, next) => {
  try {
    const data = req.body;

    const commentInstance = new Comment(data);
    const comment = await commentInstance.create();

    res.send(comment);
  } catch (err) {
    next(err);
  }
});

router.put("/update/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const comment = await Comment.updateComment(id, data);

    res.send(comment);
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await Comment.deleteComment(id);

    res.send(comment);
  } catch (err) {
    next(err);
  }
});

router.get("/post/comments/:post_id", async (req, res, next) => {
  try {
    const { post_id } = req.params;

    const comments = await Comment.getPostComments(post_id);

    if (!comments)
      return res.status(404).send("This post has no comments yet!");

    res.send(comments);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
