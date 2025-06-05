const express = require('express');
const { fetchProject } = require('../controllers/fetchProjectController');
const { exportProject } = require('../controllers/exportProjectController');
const projectRouter = express.Router();

projectRouter.get('/fetch', fetchProject);
projectRouter.get('/export/:type', exportProject);

module.exports = {projectRouter};