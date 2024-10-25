const multer = require("multer");
const fs = require("fs");

const thumnailWhitelist = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

const vidoeWhitelist = [
  "video/mp4",
  "video/webm",
  "video/x-m4v",
  "video/quicktime",
];

const thumbnailFieldName = "thumbnail";
const thumbnailLocation = "./uploads/thumbnails";
const videoFieldName = "video";
const videoLocation = "./uploads/videos";

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

if (!fs.existsSync(thumbnailLocation)) {
  fs.mkdirSync(thumbnailLocation);
}

if (!fs.existsSync(videoLocation)) {
  fs.mkdirSync(videoLocation);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == thumbnailFieldName)
      return cb(null, thumbnailLocation);
    else if (file.fieldname === videoFieldName) return cb(null, videoLocation);
    else return cb(new Error("Invalid field name"), null);
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, req.videoId + "." + file.originalname.split(".").pop());
  },
});

const uploader = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      (file.fieldname === thumbnailFieldName &&
        !thumnailWhitelist.includes(file.mimetype)) ||
      (file.fieldname === videoFieldName &&
        !vidoeWhitelist.includes(file.mimetype))
    ) {
      return cb(new Error("file is not allowed"));
    }
    cb(null, true);
  },
});

const multiUpload = uploader.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

module.exports = { multiUpload };
