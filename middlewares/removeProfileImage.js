const fs = require("fs");

module.exports = async (req, res, next) => {
  const data = JSON.parse(req.body.item);

  if (req.files && data.profile_image !== "") {
    const filePath = `${process.cwd()}/client/public${data.profile_image}`;

    fs.unlink(filePath, (err) => {
      console.log("remove pro image error: ", err);
      next(err);
    });
  }
  next();
};
