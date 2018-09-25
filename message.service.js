let Message = require('./models/Message.js');
let express = require('express');
let router = express.Router();

router.post('/messages', (req, res) => {
    let message = new Message(req.body);
    message.save((err, result) => {
        if (err) {
            console.error('saving message error');
            return res.status(500).send({ message: 'Saving message error' });
        }

        res.status(200).send(result);
    });
});

module.exports = router;