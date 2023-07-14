const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const Campground = require("./models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Database connected"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/makecampground", async (req, res) => {
  const camp = new Campground({
    title: "My Backyard",
    price: "0.00",
    description: "cheap camping",
    location: "backyard",
  });
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
