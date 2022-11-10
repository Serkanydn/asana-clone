const { Project } = require('../models');

const insert = async (data) => {
    const project = new Project(data);
    return await project.save();

}

const list = async () => {
    return await Project.find()
}

module.exports = {
    insert,
    list
}