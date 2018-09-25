let mongoose = require('mongoose');

module.exports = mongoose.model('Message', {
    message: String
})