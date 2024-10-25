const { validationResult } = require("express-validator");

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req).array();
  if (errors.length != 0) {
    res.status(400).send(errors);
    return;
  }
  next();
};

module.exports = {
  validationMiddleware,
};
