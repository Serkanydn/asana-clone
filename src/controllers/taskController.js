const httpStatus = require('http-status')
const { taskService } = require('../services')

class TaskController {
    async index(req, res) {
        try {
            if (!req?.params?.projectId)
                return res.status(httpStatus.BAD_REQUEST).json({
                    error: 'Proje Bilgisi Eksik.'
                })

            const sections = await taskService.list({ projectId: req.params.projectId });
            res.status(httpStatus.OK).send(sections);

        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                error
            })
        }
    }

    async create(req, res) {
        try {
            req.body.userId = req.user;
            const result = await taskService.create(req.body)
            res.status(httpStatus.CREATED).send(result)
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                error
            })
        }
    }

    async update(req, res) {
        try {
            if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({
                message: 'Id bilgisi eksik.'
            })

            const updatedDoc = await taskService.update(req.params.id, req.body);

            res.status(httpStatus.OK).send(updatedDoc)
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                error
            })
        }
    }

    async deleteTask(req, res) {
        try {

            if (!req.params.id)
                return res.status(httpStatus.BAD_REQUEST).send({
                    message: 'Id bilgisi eksik.'
                })

            const result = await taskService.delete(req.params.id);

            if (!result)
                return res.status(httpStatus.BAD_REQUEST).send({
                    message: 'Böyle bir kayıt bulunamamaktadır.'
                })

            res.status(httpStatus.OK).send({
                message: 'Kayıt Silinmiştir.'
            })

        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                error
            })
        }
    }



    async makeComment(req, res) {
        try {

            const mainTask = await taskService.findOne({ _id: req.params.id })

            if (!mainTask)
                res.status(httpStatus.NOT_FOUND).json({
                    message: 'Böyle bir kayıt bulunmamaktadır.'
                })

            const comment = {
                ...req.body,
                commentedAt: new Date(),
                userId: req.user,
            }

            mainTask.comments.push(comment);

            const updatedDoc = await mainTask.save();

            res.status(httpStatus.OK).send(updatedDoc)
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                error
            })
        }
    }


    async deleteComment(req, res) {
        try {

            const mainTask = await taskService.findOne({ _id: req.params.id })

            if (!mainTask)
                return res.status(httpStatus.NOT_FOUND).json({
                    message: 'Böyle bir kayıt bulunmamaktadır.'
                })

            mainTask.comments = mainTask.comments.filter((c) => c.id !== req.params.commentId)

            const updatedDoc = await mainTask.save();

            res.status(httpStatus.OK).send(updatedDoc)
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                error
            })
        }
    }


    async addSubTask(req, res) {
        try {

            if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({
                message: 'Id bilgisi eksik.'
            })


            const mainTask = await taskService.findOne({ _id: req.params.id })

            if (!mainTask)
                return res.status(httpStatus.NOT_FOUND).json({
                    message: 'Böyle bir kayıt bulunmamaktadır.'
                })

            req.body.userId = req.user;
            const subTask = await taskService.create({ ...req.body, userId: req.user })

            mainTask.subTasks.push(subTask);

            const updatedMainTask = await mainTask.save();

            res.status(httpStatus.CREATED).send(updatedMainTask)
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                error
            })
        }
    }


    async fetchTask(req, res) {
        try {

            if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({
                message: 'Id bilgisi eksik.'
            })

            const mainTask = await taskService.findOne({ _id: req.params.id }, true)

            if (!mainTask)
                return res.status(httpStatus.NOT_FOUND).json({
                    message: 'Böyle bir kayıt bulunmamaktadır.'
                })

            res.status(httpStatus.CREATED).send(mainTask)
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                error
            })
        }
    }

}

module.exports = new TaskController();



