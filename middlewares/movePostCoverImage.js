module.exports = (req, res, next) => {
  const data = JSON.parse(req.body.item);

  if (req.files) {
    const file = req.files.file;

    file.mv(`${process.cwd()}/client/public/uploads/${file.name}`, (err) => {
      if (err) next(err);
    });

    req.data = { ...data, cover_image: `/uploads/${file.name}` };
  }

  next();
};
