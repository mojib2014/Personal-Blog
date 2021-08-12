module.exports = function (err, req, res, next) {
  if (err.code) {
    return res.status(400).send(err.message || err.detail);
  }

  if (err.status) {
    console.log("error: ", err);
    return res.status(err.status || 500).send(err.message || err.detail);
  }

  next(err);
};
