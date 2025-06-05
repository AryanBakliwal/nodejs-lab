const User = require("../models/user-model");

async function signup(req, res, next) {
    const {name, email, password} = req.body;
    try {
        const user = await User.create({name: name, email: email, password: password});
        console.log(`User ${name} created successfully!`);
        // res.status(200).send(`User ${name} created successfully!`);
        req.userId = user._id;
        next();
    } catch (err) {
        console.log('Error: ', err.message);
        return res.status(400).send('Error: ' + err.message)
    }
}

async function login(req, res, next) {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    console.log(user);
    
    if(user == null) {
        res.status(404).send('User not found!');
        return;
    }

    if(user.password == password) {
        req.userId = user._id;
        next();
    } else {
        res.status(403).send('Wrong password!');
    }
}

async function logout(req, res, next) {
    res.cookie('jwt', '', {maxAge: 1});
    res.status(200).send('Logged out successfully!')
}

async function profile(req, res) {
    const user = await User.findById(req.userId);
    res.send(`Hello ${user.name}`);
}

async function updateUser(req, res) {
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

module.exports = {signup, login, logout, profile, updateUser}