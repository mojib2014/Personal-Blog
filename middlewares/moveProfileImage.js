module.exports = (req, res, next) => {
  const data = JSON.parse(req.body.item);

  if (req.files) {
    const file = req.files.image;
    file.mv(`${process.cwd()}/client/public/profile/${file.name}`, (err) => {
      if (err) next(err);
    });

    req.body = {
      ...data,
      profile_image: `/profile/${file.name}`,
      cover_image: `/profile/${file.name}`,
    };
  }

  next();
};
