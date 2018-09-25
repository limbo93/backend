let mongoose = require('mongoose');

module.exports = mongoose.model('Message', {
    message: String,
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
})