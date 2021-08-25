const multer = require("multer");
const upload = multer({ dest: `${process.cwd()}/client/public/uploads` });

module.exports = upload;
