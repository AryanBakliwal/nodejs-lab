const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
require('dotenv').config({path: './src/.env'});

const maxAge = 3 * 24 * 60 * 60;

async function sendToken(req, res) {
    const token = jwt.sign({id: req.userId}, process.env.JWT_SECRET, {
        expiresIn: maxAge, // 3 days
    });
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000}); // name = 'jwt', value = token
    res.status(200).send('Logged in');
}

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                console.log(err);
                res.send(err);
            } else {
                console.log(decoded);
                req.userId = decoded.id;
                next();
            }
        })
    } else {
        res.send('Please login first');
    }
}

const verifyRole = async (req, res, next) => {
    const user = await User.findById(req.userId);
    console.log(user.role);
    if(user.role === 'manager') {
        next();
    } else {
        res.send('Not enough priveleges!');
    }
}

module.exports = {sendToken, verifyToken, verifyRole};