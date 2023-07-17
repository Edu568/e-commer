const multer = require("multer");
const path = require("path");

const storageImage = multer.diskStorage({
      destination: function (req, file, callback) {
            callback(null, "./public/img/avatar");
      },
      filename: function (req, file, callback) {
            callback(null, `${Date.now()}_${path.extname(file.originalname)}`);
      },
});
const uploadAvatar = multer({ storage: storageImage });

module.exports = {
      uploadAvatar,
};
