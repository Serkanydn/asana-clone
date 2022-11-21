const BaseService = require("./baseService");
const { Project } = require("../models");

class ProjectService extends BaseService {
    
    async list(where) {
        return await this.model.find(where || {}).populate({
            path: "userId",
            select: "fullName email profileImage"
        })
    }



}

module.exports = new ProjectService(Project);