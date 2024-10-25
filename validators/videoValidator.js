const videoUploadValidator = {
  title: {
    errorMessage: "Title cannot be empty",
    in: ["body"],
    notEmpty: true,
    isString: true,
  },

  description: {
    errorMessage: "Description cannot be empty",
    in: ["body"],
    notEmpty: true,
    isString: true,
  },
};

module.exports = { videoUploadValidator };
