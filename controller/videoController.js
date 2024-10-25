const db = require("../models");
const Video = db.video;
const { videoLocation, thumbnailLocation } = require("../utils/multerUtil");
const uploadVideo = (req, res) => {
  const video = new Video({
    owner: req.userId,
    title: req.body.title,
    description: req.body.description,
    videoId: req.videoId,
    videoUrl: videoLocation + "/" + req.videoName,
    thumbnailUrl: thumbnailLocation + "/" + req.thumbnailName,
  });
  video.save().then((video, err) => {});
  res.status(200).send({ message: "received" });
};

module.exports = { uploadVideo };
