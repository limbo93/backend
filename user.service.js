let express = require('express');
let router = express.Router();
let User = require('./models/User.js');
let jwt = require('jwt-simple');

router.get('/users', async (req, res) => {
    try {
        let users = await User.find({}, '-pwd -__v');
        res.send(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;