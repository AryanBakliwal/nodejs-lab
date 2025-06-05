const { con } = require("../config/redisConfig/redisconfig");
const {StatusCodes} = require('http-status-codes');

const cacheMiddleware = async (req, res, next) => {
    const {username} = req.params;
    const c = await con.get(username);
    
    if(c != null) {
        console.log('Found cached.');
        return res.status(StatusCodes.OK).send(`${username} has ${c} public repositories.`);
    }
    next();
}

module.exports = {cacheMiddleware};