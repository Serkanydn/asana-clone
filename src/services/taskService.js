const BaseService = require("./baseService");
const { Task } = require("../models");

class TaskService extends BaseService {

    async findOne(where, expand) {

        if (!expand) return await this.model.findOne(where);


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




}

module.exports = new TaskService(Task);