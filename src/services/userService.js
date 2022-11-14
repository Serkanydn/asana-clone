const { User } = require('../models');

const insert = async (data) => {
    console.log(data);
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


module.exports = {
    insert,
    list,
    loginUser,
    modify,

}