const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Role = db.role;
const ROLES = db.ROLES;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId).then((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      if (!user.isAdmin) {
        res.status(403).send({ message: "Require Admin Access!" });
        return;
      }
    }
    next();
  });
};

const isModerator = (req, res, next) => {
  User.findById(req.userId).then((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      if (!user.isModerator) {
        res.status(403).send({ message: "Require Moderator Access!" });
        return;
      }
    }
    next();
  });
};

const isStaff = (req, res, next) => {
  User.findById(req.userId).then((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      if (!user.isModerator || !user.isAdmin) {
        res.status(403).send({ message: "Require Staff Access!" });
        return;
      }
    }
    next();
  });
};

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  })
    .exec()
    .then((user, err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Username/Email is already in use!" });
        return;
      }
      next();
    })
    .catch((err) => {
      res.status(500).send({ message: err });
      return;
    });
};

module.exports = {
  verifyToken,
  isAdmin,
  checkDuplicateUsernameOrEmail,
  isStaff,
  isModerator,
};
