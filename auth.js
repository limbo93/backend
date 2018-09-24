let jwt = require("jwt-simple");
let bcrypt = require("bcrypt-nodejs");
let User = require("./models/User.js");

module.exports = {
  register: (req, res) => {
    let userData = req.body;
    let user = new User(userData);

    user.save((err, result) => {
      if (err) console.log("error occured while saving user data");

      res.status(201).send(result);
    });
  },

  login: async (req, res) => {
    let loginData = req.body;
    let user = await User.findOne({ email: loginData.email });
    if (!user)
      return res.status(401).send({ message: "Email or Password invalid." });

    bcrypt.compare(loginData.pwd, user.pwd, (err, isMatch) => {
      if (!isMatch)
        return res.status(401).send({ message: "Email or Password invalid." });

      let payload = {};
      let token = jwt.encode(payload, "123");

      res.status(200).send({ token });
    });
  }
};
