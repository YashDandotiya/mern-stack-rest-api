const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { required: true, type: String },
    password: { required: true, type: String },
    email: { required: true, type: String, unique: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
