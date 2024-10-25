const { checkSchema } = require("express-validator");
const { verifyToken } = require("../middlewares/authMiddleware");
const { videoUploadValidator } = require("../validators/videoValidator");
const { uploadVideo } = require("../controller/videoController");
const { validationMiddleware } = require("../middlewares/validationMiddleware");
const {
  generateVideoId,
  validateFormData,
} = require("../middlewares/videoMiddleware");
const router = require("express").Router();
const { multiUpload } = require("../utils/multerUtil");

router.post(
  "/upload",
  [
    verifyToken,
    generateVideoId,
    multiUpload,
    checkSchema(videoUploadValidator),
    validateFormData,
    validationMiddleware,
  ],
  uploadVideo
);

// router.get("/", getVideoItems)
// router.get("/:videoId", getVideoInfo)
module.exports = router;
