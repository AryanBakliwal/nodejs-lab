const logMethodURL = function(req, res, next) {
    console.log(req.method + " /api/user" + req.url);
    next();
}

module.exports = logMethodURL;