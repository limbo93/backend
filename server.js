let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let User = require('./models/User.js');

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

app.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);

    user.save((err, result) => {
        if (err)
            console.log('error occured while saving user data');

        res.sendStatus(200);
    });
});

mongoose.connect('mongodb://limbo:mongo_db_1@ds211613.mlab.com:11613/pssocial', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log("connected to mongoose") }
});

app.listen(3000);