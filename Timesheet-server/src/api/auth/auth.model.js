const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    rooms: [{type: Schema.Types.ObjectId, ref: 'rooms'}]
});

module.exports = mongoose.model('authUser', authUserSchema);