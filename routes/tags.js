const router = require("express").Router();
const Tag = require("../models/tag");

router.get("/:tag_id", async (req, res, next) => {
  const { tag_id } = req.params;

  try {
    const tag = await Tag.getTagById(tag_id);

    if (!tag)
      return res.status(404).send("A tag with the given ID was not found!");

    res.send(tag);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
