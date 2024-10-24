const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const dotenv = require("dotenv");
const compression = require("compression");
const authRoute = require("./routes/auth");

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("combined"));
app.use(compression());

const db = require("./models");
db.mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.use(async (req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// ROUTES
app.use("/api/v1/auth", authRoute);

// Listen
const PORT = process.env.PORT;

app.listen(PORT || 3000, function () {
  console.log("Server is running on Port: " + (PORT || 3000));
});
