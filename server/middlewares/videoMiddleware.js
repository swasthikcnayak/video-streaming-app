const uniqueSlug = require("unique-slug");
const { v4: uuidv4 } = require("uuid");

const generateVideoId = (req, res, next) => {
  req.videoId = uniqueSlug(uuidv4().toString());
  next();
};

const validateFormData = (err, req, res, next) => {
  if (err) {
    return res.status(400).send({ message: err.message });
  }
  if (!req.files) {
    return res.status(400).send({ message: "Files empty" });
  }
  if (!req.files.thumbnail) {
    return res.status(400).send({ message: "Thumbnail not found" });
  }
  if (!req.files.video) {
    return res.status(400).send({ message: "Video not found" });
  }
  next();
};

module.exports = {
  validateFormData,
  generateVideoId,
};
