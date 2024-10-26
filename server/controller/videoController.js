const db = require("../models");
const videoModel = require("../models/video.model");
const Video = db.video;
const { videoLocation, thumbnailLocation } = require("../utils/multerUtil");
const fs = require("fs");
const path = require("path");

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

const getVideoInfo = async (req, res) => {
  const result = await Video.findOne({
    videoId: req.params.videoId,
    isActive: true,
  }).select({
    title: 1,
    description: 1,
    videoId: 1,
    thumbnailUrl: 1,
    videoUrl: 0,
    _id: 0,
  });
  if (!result) {
    res.status(404).send({ message: "not found" });
  }
  return res.status(200).json(result);
};

const getThumbnail = async (req, res) => {
  const result = await Video.findOne({
    videoId: req.params.videoId,
    isActive: true,
  }).select({
    thumbnailUrl: 1,
    _id: 0,
  });
  if (result == null) {
    console.log("Here");
    return res.status(404).send({ message: "not found" });
  }
  const filename = result.thumbnailUrl.split("/").pop();
  console.log(__dirname);
  const fileLocation = path.join(
    __dirname,
    "../uploads",
    "thumbnails",
    filename
  );

  return res.sendFile(fileLocation, (err) => {
    if (err) {
      return res.status(404).send("Image not found");
    }
  });
};

const streamVideo = async (req, res) => {
  const range = req.headers.range;
  if (!range) {
    return res.status(400).send({ message: "range not defined" });
  }
  const result = await Video.findOne({
    videoId: req.params.videoId,
    isActive: true,
  }).select({
    videoUrl: 1,
    _id: 0,
  });
  if (!result || !result.videoUrl) {
    return res.status(404).send({ message: "not found" });
  }
  const videoPath = result.videoUrl;
  const videoSize = fs.statSync(videoPath).size;
  const chunkSize = 10 ** 6;
  // bytes=64165
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + chunkSize, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
};
module.exports = {
  uploadVideo,
  getVideoItems,
  getVideoInfo,
  getThumbnail,
  streamVideo,
};
