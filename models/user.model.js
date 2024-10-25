const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: false,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileSlug: {
      type: String,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isModerator: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    avtarUrl: {
      type: String,
    },
  },
  { collection: "USER" }
);

module.exports = mongoose.model("USER", UserSchema);
