require("dotenv").config();
const express = require("express");
const app = express();

const logEvents = require("./middleware/logger");

const cors = require("cors");
const corsOptions = require("./config/corsOptions");
app.use(cors());

const dbConnect = require("./config/dbConn");
const mongoose = require("mongoose");

cookieParser = require("cookie-parser");
app.use(cookieParser());

const PORT = 3500;

dbConnect();

app.use((req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`);
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.json());

app.use("/", require("./routes/root"));

app.use("/trekList", require("./routes/trekListRoute"));

app.use("/auth", require("./routes/authRoute"));

app.use("/profile", require("./routes/profileRoute"));

app.use("/preferences", require("./routes/preferencesRoute"));

app.use("/favorite", require("./routes/favoriteRoute"));

app.all("*", (req, res) => {
  res.sendStatus(404);
});

mongoose.connection.once("open", () => {
  logEvents("Connected to MongoDB");

  app.listen(PORT, () => {
    logEvents(`Server running on port ${PORT}`);
    console.log(`Server Started`);
  });
});

mongoose.connection.on("error", (err) => {
  logEvents(`${err}`);
});
