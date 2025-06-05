// this is controller

const controllerFunc = (req, res, next) => {
    res.send("Sent from controller function")
}

module.exports = controllerFunc