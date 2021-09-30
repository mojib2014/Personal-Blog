const fs = require("fs");

module.exports = async (req, res, next) => {
  const data = JSON.parse(req.body.item);
  let file;
  if (req.files) file = req.files.image;

  if (file && data.cover_image !== "") {
    const filePath = `${process.cwd()}/client/public${data.cover_image}`;

    fs.unlink(filePath, (err) => next(err));

    next();
  }
  next();
};
