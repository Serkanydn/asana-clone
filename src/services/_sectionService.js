const { Section } = require('../models');

const insert = async (data) => {
    const project = new Section(data);
    return await project.save();

}

const list = async (where) => {
    return await Section.find(where || {})
    .populate({
        path: "userId",
        select: "fullName email profileImage"
    })
    // .populate({
    //     path: "projectId",
    //     select: "name"
    // })
}

const modify = async (id, data) => {
    return await Section.findByIdAndUpdate(id, data, { new: true });
}

const remove = async (id) => {
    return await Section.findByIdAndDelete(id);
}


module.exports = {
    list,
    insert,
    modify,
    remove
}