const BaseService = require("./baseService");
const { User } = require("../models");

class UserService extends BaseService {

    async loginUser(data) {
        return await User.findOne(data)
    }



}

module.exports = new UserService(User);