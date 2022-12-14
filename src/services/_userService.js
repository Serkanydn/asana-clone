const { User } = require('../models');

const insert = async (data) => {
    const user = new User(data);
    return await user.save();

}

const list = async () => {
    return await User.find()
}

const loginUser = async (data) => {
    return await User.findOne(data)
}

const modify = async (where, data) => {
    return await User.findOneAndUpdate(where, data, { new: true })
}


const remove = async (id) => {
    return await User.findByIdAndDelete(id);
}


module.exports = {
    insert,
    list,
    loginUser,
    modify,
    remove,

}