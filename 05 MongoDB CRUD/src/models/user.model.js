const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    email: String,
    created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;