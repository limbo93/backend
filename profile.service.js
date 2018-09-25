let express = require('express');
let router = express.Router();
let User = require('./models/User.js');
let server = require('./server.js');


router.get('/profile/:profileId', async (req, res) => {
    try {
        let user = await User.findById(req.params.profileId, '-pwd -__v');
        res.send(user);
    } catch (error) {
        console.error(error);
        res.sendStatus(200);
    }
});

module.exports = router;