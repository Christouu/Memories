const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const postRoute = require("./routes/posts");
const authRouter = require("./routes/auth");

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("DB connection successfull"))
  .catch((e) => console.log(e));

app.use("/api/post", postRoute);
app.use("/api/auth", authRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is running on port 5000");
});
