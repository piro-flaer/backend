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
  console.log(`00 ${req.method}\t${req.url}\t${req.headers.origin}`);
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.json());
const test01 = require("./routes/root");
app.use("/", test01);
console.log("01", test01);

const test02 = require("./routes/trekListRoute");
app.use("/trekList", test02);
console.log("02", test02);

const test03 = require("./routes/authRoute");
app.use("/auth", test03);
console.log("03", test03);

const test04 = require("./routes/profileRoute");
app.use("/profile", test04);
console.log("04", test04);

const test05 = require("./routes/preferencesRoute");
app.use("/preferences", test05);
console.log("05", test05);

const test06 = require("./routes/favoriteRoute");
app.use("/favorite", test06);
console.log("06", test06);

app.all("*", (req, res) => {
  res.sendStatus(404);
});

mongoose.connection.once("open", () => {
  logEvents("Connected to MongoDB");
  console.log("Connected to MongoDB");

  app.listen(PORT, () => {
    logEvents(`Server running on port ${PORT}`);
    console.log(`Server Started`);
  });
});

mongoose.connection.on("error", (err) => {
  logEvents(`${err}`);
});
