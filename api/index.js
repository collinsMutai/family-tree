const fs = require("fs")
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require("multer")
const imageDownloader = require("image-downloader");
const dotenv = require("dotenv");
dotenv.config();




const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

const familyRoutes = require("./routes/Family")

const app = express();
app.use(express.json())
app.use("/uploads", express.static(__dirname + "/uploads"))
app.use(
  cors({
    credentials: true,
    origin: "https://family-tree-zqa1.onrender.com",
  })
);
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://family-tree-zqa1.onrender.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(familyRoutes)

app.post("/upload-by-link", async (req, res, next) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  console.log(req.files);
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to DB, Listening on PORT ${PORT}`);
    });
  })
  .catch((err) => console.log(err));