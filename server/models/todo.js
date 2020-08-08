
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
    }
})

var Todo = mongoose.model('Todo', todoSchema);

module.exports = {Todo};