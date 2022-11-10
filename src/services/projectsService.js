const { Project } = require('../models');

const insert = async (projectData) => {
    const project = new Project(projectData);
    return await project.save();

}

const list = async () => {
    return await Project.find()
}

module.exports = {
    insert,
  list
}