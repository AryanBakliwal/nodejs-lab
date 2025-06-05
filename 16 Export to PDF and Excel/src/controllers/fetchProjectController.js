const fs = require('node:fs');
const path = require('node:path');
const exampleProjectsFilePath = path.join(__dirname, "../helpers/exampleProjects.json");
const {projects} = JSON.parse(fs.readFileSync(exampleProjectsFilePath, "utf8"));

const fetchProject = (req, res) => {
    res.json(projects);
}

module.exports = {fetchProject};