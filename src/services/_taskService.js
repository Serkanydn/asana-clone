const { Task } = require('../models');

const insert = async (data) => {
    const task = new Task(data);
    return await task.save();

}

const list = async (where) => {
    return await Task.find(where || {})
        .populate({
            path: "userId",
            select: "fullName email profileImage"
        })
}

const modify = async (id, data) => {
    return await Task.findByIdAndUpdate(id, data, { new: true });
}

const remove = async (id) => {
    return await Task.findByIdAndDelete(id);
}

const findOne = async (where, expand) => {

    if (!expand) return await Task.findOne(where);


    return await Task.findOne(where)
        .populate({
            path: "userId",
            select: "fullName email profileImage"
        }).populate({
            path: "comments",
            populate: {
                path: "userId",
                select: "fullName email profileImage"
            }
        }).populate({
            path: "subTasks",
            select: "title description isComplated assignedTo order subTasks statuses"
        });
}


module.exports = {
    list,
    insert,
    modify,
    remove,
    findOne,

}