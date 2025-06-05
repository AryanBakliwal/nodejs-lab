const path = require('node:path');
const express = require('express')
require('dotenv').config({path: './src/config/env/.env'});
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5500'
}));

const storage = multer.diskStorage({
    destination: (req, res, cb) => { // where to upload files
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => { // name of file after upload
        console.log(file);
        cb(null, Date.now() + '_' + file.originalname + path.extname(file.originalname)); // date_originalFileName.extension
    }
})
const upload = multer({storage: storage}); // middleware

// required property on form tag enctype="multipart/form-data"
app.post('/upload', upload.single('myfile'), (req, res) => { // myfile is the name of the input field in HTML form, single means only taking one file
    res.send('Uploaded!')
})

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}...`);
})