const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const postRoute = require("./routes/posts");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://admin:brandpyro123@cluster0.lnbg7.mongodb.net/memories?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB connection successfull"))
  .catch((e) => console.log(e));

app.use("/api/post", postRoute);

app.listen(5000, () => {
  console.log("Backend is running on port 5000");
});
