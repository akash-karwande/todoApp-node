
var mongoose = require('mongoose');



var todoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5
    },

    completed: {
        type: Boolean,
        default: false
    },

    completedAt: {
        type: Number,
        default: null
    },

    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = {Todo};