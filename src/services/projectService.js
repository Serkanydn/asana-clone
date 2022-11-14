const { Project } = require('../models');

const insert = async (data) => {
    const project = new Project(data);
    return await project.save();

}

const list = async (where) => {
    return await Project.find(where || {}).populate({
        path: "userId",
        select: "fullName email"
    })
}

const modify = async (id, data) => {
    return await Project.findByIdAndUpdate(id, data, { new: true });
}


module.exports = {
    list,
    insert,
    modify,
}