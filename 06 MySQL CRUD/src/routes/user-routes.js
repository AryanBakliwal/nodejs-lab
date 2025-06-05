const express = require('express');
const logMethodURL = require('../middlewares/user-middleware');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/user-controller');

const userRouter = express.Router();

userRouter.use(logMethodURL);

userRouter.get('/', getUsers);

userRouter.post('/new', createUser);

userRouter.put('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

module.exports = userRouter;