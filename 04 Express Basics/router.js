// this is a route module

const express = require("express");
const controllerFunc = require("./controllers/controller");
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Something");
})

// router level middleware

router.use((req, res, next) => {
    console.log("Middleware")
    next()
})

router.get("/last", (req, res, next) => {
    res.send("Response after middleware")
})

// using controller function as request handler
router.get("/controller", controllerFunc) 

module.exports = router;
