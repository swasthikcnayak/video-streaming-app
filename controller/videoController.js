const db = require("../models");
const videoModel = require("../models/video.model");
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

const getVideoItems = async (req, res) => {
  const pageNumber = parseInt(req.query.pageNumber) || 0;
  const limit = parseInt(req.query.limit) || 10;

  const result = {};
  const totalVideos = await videoModel.countDocuments().exec();
  let startIndex = pageNumber * limit;
  const endIndex = (pageNumber + 1) * limit;
  result.totalVideos = totalVideos;
  if (startIndex > 0) {
    result.previous = {
      pageNumber: pageNumber - 1,
      limit: limit,
    };
  }
  if (endIndex < totalVideos) {
    result.next = {
      pageNumber: pageNumber + 1,
      limit: limit,
    };
  }
  result.data = await Video.find({ isActive: true })
    .sort("-_id")
    .skip(startIndex)
    .limit(limit)
    .select({ title: 1, description: 1, videoId: 1, thumbnailUrl: 1, _id: 0 })
    .exec();
  result.rowsPerPage = limit;
  return res.status(200).json(result);
};

module.exports = { uploadVideo, getVideoItems };
