require('dotenv').config({path: './src/config/env/.env'});
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const { getTransport, getGmailTransport } = require('./config/emailTransport/transportConfig');

const sendTestEmail = async (to, subject, body) => {
    const transport = await getTransport();
    transport.sendMail({
        from: '"Aryan Bakliwal" <aryan@ethereal.email>',
        to: to,
        subject: subject,
        text: body, // plain‑text body
        html: `<b>${body}</b>`, // HTML body
    }, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}

const sendGmailMail = (to, subject, body) => {
    const transport = getGmailTransport();
    transport.sendMail({
        from: process.env.GMAIL_USER,
        to: to,
        subject: subject,
        text: body
    }, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
        console.log('Email sent: %s', info.messageId);
    })
}

// sendGmailMail("aryanbakliwal12345@gmail.com", "Test Email", "Sent from Node.js app using Nodemailer");
let i = 0;
const task = cron.schedule('*/5 * * * * *', () => {
    sendGmailMail("aryanbakliwal@example.com", `Test Email ${i++}`, "Sent from Node.js app using Nodemailer");
});

task.start();

setTimeout(() => {
    task.stop();
}, 10000);