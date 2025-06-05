const User = require("../models/user.model.js");

async function getUsers(req, res, next) {
    if(req.url == '/') {
        const users = await User.find();
        console.log(users);
        res.status(200).send(users);
    } else {
        const columns = Object.keys(User.schema.paths);
        console.log(columns);
        for(const key in req.query) {
            if(!columns.includes(key)) {
                console.log(`invalid property ${key}!`);
                res.status(404).send(`invalid property ${key}!`);
                return;
            }
        }
        const user = await User.find(req.query);
        res.status(200).send(user)
    }
}

async function createUser(req, res, next) {

    const body = req.body;
    console.log(body);
    const columns = Object.keys(User.schema.paths);
    console.log(columns);
    for(const key in body) {
        if(!columns.includes(key)) {
            console.log(`invalid property ${key}!`);
            res.status(404).send(`invalid property ${key}!`);
            return;
        }
    }

    const user = await User.create(body);
    res.status(200).send(body);
    return;
    
}

async function updateUser(req, res, next) {
    const u = await User.findById(req.params.id);
    console.log(u);
    if(u === null) {
        res.status(404).send("User not found!");
        return;
    }
    const columns = Object.keys(User.schema.paths);
    console.log(columns);
    for(const key in req.body) {
        if(!columns.includes(key)) {
            console.log(`invalid property ${key}!`);
            res.status(404).send(`invalid property ${key}!`);
            return;
        }
    }
    const user = await User.updateOne(req.body);
    res.status(200).send("User details updated!");
}

async function deleteUser(req, res, next) {
    const u = await User.findById(req.params.id);
    console.log(u);
    if(u === null) {
        res.status(404).send("User not found!");
        return;
    }
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(200).send("User deleted!");
}

module.exports = {getUsers, createUser, updateUser, deleteUser}