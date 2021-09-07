const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entriesSchema = new mongoose.Schema({
    date: {
        type: Date,
        require: true
    },
    workedHours: {
        type: Number,
        require: true
    },
    project: {
        type: String,
        require: true
    },
    task: {
        type: String,
        require: true
    },
    subtask: {
        type: String,
        require: false
    },
    notes: {
        type: String,
        require: false
    }
});

module.exports = mongoose.model('entries', entriesSchema);