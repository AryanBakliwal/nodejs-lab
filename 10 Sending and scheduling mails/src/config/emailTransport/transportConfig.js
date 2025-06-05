const nodemailer = require('nodemailer');
require('dotenv').config({path: '../env/.env'});

const getTransport = async () => {
    try {
        const account = await nodemailer.createTestAccount();

        return nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        })
    } catch (error) {
        return error;
    }
}

const getGmailTransport = () => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GOOGLE_APP_PASSWORD
        }
    })
}

module.exports = {getTransport, getGmailTransport};