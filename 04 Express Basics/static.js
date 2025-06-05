const express = require('express')
const app = express()
const port = process.env.PORT

app.use(express.static('public')) // for static content
// app.use('/static', express.static('public')) // adds a mount path
// like http://localhost:8000/static/ironman.jpg for http://localhost:8000/ironman.jpg

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Express.js server listening on port ${port}`)
})

// http://localhost:8000/ironman.jpg