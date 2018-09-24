let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let User = require("./models/User.js");
let auth = require("./auth.js");

mongoose.Promise = Promise;

let app = express();
app.use(cors());
app.use(bodyParser.json());

let data = [{ message: "R&D" }, { description: "..." }];

app.get("/rnd", (req, res) => {
  res.send(data);
});

app.get("/users", async (req, res) => {
  try {
    let users = await User.find({}, "-pwd -__v");
    res.send(users);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get("/profile/:profileId", async (req, res) => {
  try {
    let user = await User.findById(req.params.profileId, "-pwd -__v");
    res.send(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(200);
  }
});

mongoose.connect(
  "mongodb://limbo:mongo_db_1@ds211613.mlab.com:11613/pssocial",
  { useNewUrlParser: true },
  err => {
    if (!err) {
      console.log("connected to mongoose");
    }
  }
);

app.use("/auth", auth);
app.listen(3000);
