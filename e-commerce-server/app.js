const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const itemsRouter = require("./routes/items");

mongoose
  .connect("mongodb://localhost:27017/e-commerce-db", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to e-commerce-db"))
  .catch(err => console.error(err));

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(fileUpload({ limits: { fileSize: 3 * 1024 * 1024 } }));

app.use("/api/items", itemsRouter);

module.exports = app;
