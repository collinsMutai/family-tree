const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

const familyRoutes = require("./routes/Family")

const app = express();
app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use(familyRoutes)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to DB, Listening on PORT ${PORT}`);
    });
  })
  .catch((err) => console.log(err));