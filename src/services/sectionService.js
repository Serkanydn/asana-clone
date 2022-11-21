const BaseService = require("./baseService");
const { Section } = require("../models");

class SectionService extends BaseService {

    async list(where) {
        return await this.model.find(where || {}).populate({
            path: "userId",
            select: "fullName email profileImage"
        })
    }



}

module.exports = new SectionService(Section);