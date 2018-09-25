let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let User = require('./models/User.js');
let authService = require('./auth.service.js');
let userService = require('./user.service.js');
let profileService = require('./profile.service.js');
let messageService = require('./message.service.js');

mongoose.Promise = Promise;

let app = express();
app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://limbo:mongo_db_1@ds211613.mlab.com:11613/pssocial', { useNewUrlParser: true }, err => {
  if (!err) {
    console.log('connected to mongoose');
  }
});

app.use('/auth', authService);
app.use(userService);
app.use(profileService);
app.use(messageService);
app.listen(3000);
