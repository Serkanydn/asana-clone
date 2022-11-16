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


module.exports = {
    list,
    insert,
    modify,
    remove
}