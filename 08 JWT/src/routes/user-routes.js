const express = require('express');
const { signup, login, logout, profile, updateUser } = require('../controllers/user-controller');
const {sendToken, verifyToken, verifyRole} = require('../middlewares/auth');
const UserRouter = express.Router();


UserRouter.post('/signup', signup, sendToken);

UserRouter.post('/login', login, sendToken);

UserRouter.get('/logout',verifyToken, logout);

UserRouter.get('/profile',verifyToken, profile);

UserRouter.put('/update/:id',verifyToken, verifyRole, updateUser)

module.exports = UserRouter;