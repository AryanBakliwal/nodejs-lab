const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [8, 'Minimum password length is 8 characters']
    },
    role: {
        type: String,
        default: 'user'
    }
})

const User = mongoose.model('user', userSchema);

module.exports = User;