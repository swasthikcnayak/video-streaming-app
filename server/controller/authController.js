const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar-api");
const slugify = require("slugify");

const signup = (req, res) => {
  const avtarUrl = gravatar.imageUrl({ email: req.body.email, secure: true });
  const profileSlug = slugify(req.body.username, { lower: false });
  const user = new User({
    name: req.body.name || null,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    avtarUrl: `${avtarUrl}?default=wavatar`,
    profileSlug: profileSlug,
  });
  user
    .save()
    .then((user, err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
        res.send({ message: "User was registered successfully!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
      return;
    });
};

const signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .exec()
    .then((user, err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      });
      return res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        avtarUrl: user.avtarUrl,
        accessToken: token,
      });
    })
    .catch((err) => {
      console.log("error" + err);
      res.status(500).send({ message: err });
    });
};

const tokenVerified = (req, res) => {
  res.send({ message: "Token Verified" });
};

module.exports = {
  signin,
  signup,
  tokenVerified,
};
