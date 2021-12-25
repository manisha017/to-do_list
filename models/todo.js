const mongoose = require('mongoose');

const contactSchema= new mongoose.Schema({
    nameoftask: {
        type: String,
        required: true
    },
    desoftask: {
        type: String,
        required: true
    },
    catoftask: {
        type: String,
        required: true
    },
    duedate:{
        type: Date,
        required: true   
    }
});

const Todolist = mongoose.model('Todolist', contactSchema);
module.exports = Todolist;