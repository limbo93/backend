let Message = require('./models/Message.js');
let express = require('express');
let router = express.Router();
let authService = require('./auth.service.js');


router.post('/messages', authService.checkAuthenticated, (req, res) => {
    let messageData = req.body;
    messageData.author = req.userId;
    let message = new Message(messageData);

    message.save((err, result) => {
        if (err) {
            console.error('saving message error');
            return res.status(500).send({ message: 'Saving message error' });
        }

        res.status(200).send(result);
    });
});

router.get('/messages/:authorId', async (req, res) => {
    const author = req.params.authorId;
    let message = await Message.find({ author });
    res.send(message);
});

module.exports = router;