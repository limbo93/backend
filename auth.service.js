let express = require('express');
let jwt = require('jwt-simple');
let bcrypt = require('bcrypt-nodejs');
let User = require('./models/User.js');
let router = express.Router();

router.post('/register', (req, res) => {
  let userData = req.body;
  let user = new User(userData);

  user.save((err, result) => {
    if (err) console.log('error occured while saving user data');

    res.status(201).send(result);
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

module.exports = router;
