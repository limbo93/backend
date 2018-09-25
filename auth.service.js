let express = require('express');
let jwt = require('jwt-simple');
let bcrypt = require('bcrypt-nodejs');
let User = require('./models/User.js');
let router = express.Router();

router.post('/register', (req, res) => {
  let userData = req.body;
  let user = new User(userData);

  user.save((err, newUser) => {
    if (err)
      return res.status(500).send({ message: 'Email saving user.' });

    let payload = { subject: newUser._id };
    let token = jwt.encode(payload, '123');

    res.status(200).send({ token });
  });
});

router.post('/login', async (req, res) => {
  let loginData = req.body;
  let user = await User.findOne({ email: loginData.email });
  if (!user)
    return res.status(401).send({ message: 'Email or Password invalid.' });

  bcrypt.compare(loginData.pwd, user.pwd, (err, isMatch) => {
    if (!isMatch)
      return res.status(401).send({ message: 'Email or Password invalid.' });

    let payload = { subject: user._id };
    let token = jwt.encode(payload, '123');

    res.status(200).send({ token });
  });
});

const auth = {
  router,
  checkAuthenticated: (req, res, next) => {
    if (!req.header('Authorization'))
      return res.status(401).send({ message: 'Unauthorized. Token missing.' });

    let token = req.header('Authorization').split(' ')[1];
    var payload = jwt.decode(token, '123');

    if (!payload)
      return res.status(401).send({ message: 'Unauthorized. Auth header invalid.' });

    req.userId = payload.subject;

    next();
  }
}

module.exports = auth;
