var mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        min: 5,
        unique: true
    },

    age: {
        type: Boolean,
        required: true
    },

    location: {
        type: String,
        default: 'India'
    }
});

module.exports = {User};