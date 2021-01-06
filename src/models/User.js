const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
        unique: 1,
    },
    email: {
        type: String,
        required: true,
        unique: 1,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = model('User', UserSchema);
