const {StatusCodes} = require('http-status-codes');
const { con } = require('../config/redisConfig/redisconfig');

const fetchController = async (req, res) => {
    try {
        const {username} = req.params;
        const response  = await fetch(`https://api.github.com/users/${username}`)
        if(!response.ok) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Error fetching data!');
        }
        const data = await response.json();
        const repos = data.public_repos;
        console.log('Made API call');
        
        await con.setEx(username, 60, repos.toString());
        res.status(StatusCodes.OK).send(`${username} has ${repos} public repositories.`);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}

module.exports = {fetchController};