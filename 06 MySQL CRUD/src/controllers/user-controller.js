const User = require("../models/user-model");

async function getUsers(req, res, next) {
    if(req.url == '/') {
        const users = await User.findAll();
    
        var body = []
        body = users.map((user) => user.dataValues);
        console.log(body);

        // When you send users as a response using res.json(users) or res.send(users), 
        // Sequelize internally calls .toJSON() on each model instance, 
        // which automatically returns only the dataValues.
        res.status(200).send(users);
        return;
    } else {
        const columns = Object.keys(User.getAttributes()); // get array of column names 
        for(const key in req.query) {
            if(!columns.includes(key)) {
                console.log(`property ${key}  not found!`);
                res.status(404).send(`property ${key}  not found!`);
                return;
            }
        }
        console.log(columns); // [ 'id', 'name', 'email', 'created_at' ]
        
        const user = await User.findOne({ where: req.query })
        console.log(req.query);
        console.log(user.dataValues);

        res.status(200).send(user);
        return;
    }
}

async function createUser(req, res, next) {
    let body = ""
    req
    .on("error", (err) => {
        console.log(err);
        return;
    })
    .on("data", (chunk) => {
        body += chunk;
    })
    .on("end", async () => {
        body = JSON.parse(body);
        console.log(body);
        const columns = Object.keys(User.getAttributes()); // get array of column names 
        for(const key in body) {
            if(!columns.includes(key)) {
                console.log(`invalid property ${key}!`);
                res.status(404).send(`invalid property ${key}!`);
                return;
            }
        }
        const user = await User.create(body);
        console.log(`${user.name}'s id is ${user.id}`);
        res.status(200).send(`${user.name}'s id is ${user.id}`); // convert to JSON object
    })
}

async function updateUser(req, res, next) {
    let body = ""
    req
    .on("error", (err) => {
        console.log(err);
        return;
    })
    .on("data", (chunk) => {
        body += chunk;
    })
    .on("end", async () => {
        body = JSON.parse(body);
        const u = await User.findByPk(req.params.id)
        
        if(u === undefined) {
            res.status(404).send(`No user with user ID ${req.params.id}!`);
            return;
        }

        const columns = Object.keys(User.getAttributes()); // get array of column names 
        if(body !== null) {
            for(const key in body) {
                if(!columns.includes(key)) {
                    console.log(`invalid property ${key}!`);
                    res.status(404).send(`invalid property ${key}!`);
                    return;
                }
            }
        }
        
        const user = await User.update(body, { where: {id: req.params.id} });
        console.log(`Details updated for user ID ${req.params.id}`);
        res.status(200).send(`Details updated for user ID ${req.params.id}`); // convert to JSON object
    })
}

async function deleteUser(req, res, next) {
    let body = ""
    req
    .on("error", (err) => {
        console.log(err);
        return;
    })
    .on("data", (chunk) => {
        body += chunk;
    })
    .on("end", async () => {
        body = JSON.parse(body);
        const u = await User.findByPk(req.params.id)
        
        if(u === null) {
            res.status(404).send(`No user with user ID ${req.params.id}!`);
            return;
        }
        
        const user = await User.destroy({ where: {id: req.params.id} });
        console.log(`User with user ID ${req.params.id} deleted!`);
        res.status(200).send(`User with user ID ${req.params.id} deleted!`); // convert to JSON object
    })
}

module.exports = {getUsers, createUser, updateUser, deleteUser}