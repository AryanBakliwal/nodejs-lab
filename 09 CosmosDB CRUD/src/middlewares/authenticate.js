const jwt = require('jsonwebtoken');
require('dotenv').config({path: './src/config/env/.env'});
const {StatusCodes} = require('http-status-codes');
const { handleSuccess, handleFailure } = require('../utils/responseHandler');

const maxAge = 3 * 24 * 60 * 60;

async function sendToken(req, res) {
    
    const token = jwt.sign({
        hrmId: req.hrmId, 
        ctMailId: req.body.ctMailId, 
        designation: req.designation, 
        role: req.role
    }, process.env.JWT_SECRET, {
        expiresIn: maxAge, // 3 days
    });
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000}); // name = 'jwt', value = token
    handleSuccess(res, StatusCodes.OK, `${req.hrmId} Logged In`);
}

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                console.log(err);
                res.send(err);
            } else {
                req.hrmId = decoded.hrmId;
                req.designation = decoded.designation;
                req.role = decoded.role;
                next();
            }
        })
    } else {
        handleFailure(res, StatusCodes.UNAUTHORIZED, "Please login first");
    }
}

module.exports = {sendToken, verifyToken};