const mongoose = require("mongoose");

const db = {};

db.mongoose = mongoose;
db.user = require("./user.model");
db.video = require("./video.model");
module.exports = db;
