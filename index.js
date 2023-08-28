require("dotenv").config();
const express = require("express");
const app = express();

const logEvents = require("./middleware/logger");

const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const dbConnect = require("./config/dbConn");
const mongoose = require("mongoose");
const verifyJWT = require("./middleware/verifyJWT");

cookieParser = require("cookie-parser");
app.use(cookieParser());

const PORT = 3500;

dbConnect();

app.use((req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`);
  next();
});

app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.json());

app.use("/", require("./routes/root"));

app.use("/trekList", require("./routes/trekListRoute"));

app.use("/create", require("./controllers/createUser"));

app.use("/auth", require("./routes/authRoute"));

app.use("/profile", verifyJWT, require("./routes/profileRoute"));

app.use("/preferences", verifyJWT, require("./routes/preferencesRoute"));

app.use("/favorite", verifyJWT, require("./routes/favoriteRoute"));

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
