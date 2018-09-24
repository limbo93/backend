let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let User = require('./models/User.js');
let jwt = require('jwt-simple');
let bcrypt = require('bcrypt-nodejs');

mongoose.Promise = Promise;

let app = express();
app.use(cors());
app.use(bodyParser.json());

let data = [
    { message: 'R&D' },
    { description: '...' }
]

app.get('/rnd', (req, res) => {
    res.send(data);
});

app.get('/users', async (req, res) => {
    try {
        let users = await User.find({}, '-pwd -__v');
        res.send(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/profile/:profileId', async (req, res) => {
    try {
        let user = await User.findById(req.params.profileId, '-pwd -__v');
        res.send(user);
    } catch (error) {
        console.error(error);
        res.sendStatus(200);
    }
});

app.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);

    user.save((err, result) => {
        if (err)
            console.log('error occured while saving user data');

        res.status(201).send(result);
    });
});

app.post('/login', async (req, res) => {
    let loginData = req.body;
    let user = await User.findOne({ email: loginData.email });
    if (!user) return res.status(401).send({ message: 'Email or Password invalid.' });

    bcrypt.compare(loginData.pwd, user.pwd, (err, isMatch) => {
        if (!isMatch)
            return res.status(401).send({ message: 'Email or Password invalid.' });

        let payload = {};
        let token = jwt.encode(payload, '123');

        res.status(200).send({ token });
    });
});

mongoose.connect('mongodb://limbo:mongo_db_1@ds211613.mlab.com:11613/pssocial', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log("connected to mongoose") }
});

app.listen(3000);