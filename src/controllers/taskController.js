const { insert, list, modify, remove, findOne } = require('../services/taskService');
const httpStatus = require('http-status')

const index = async (req, res) => {
    try {
        if (!req?.params?.projectId)
            return res.status(httpStatus.BAD_REQUEST).json({
                error: 'Proje Bilgisi Eksik.'
            })

        const sections = await list({ projectId: req.params.projectId });
        res.status(httpStatus.OK).send(sections);

    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error
        })
    }
}

const create = async (req, res) => {
    try {
        req.body.userId = req.user;
        const result = await insert(req.body)
        res.status(httpStatus.CREATED).send(result)
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error
        })
    }
}

const update = async (req, res) => {
    try {
        if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({
            message: 'Id bilgisi eksik.'
        })

        const updatedDoc = await modify(req.params.id, req.body);

        res.status(httpStatus.OK).send(updatedDoc)
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error
        })
    }
}

const deleteTask = async (req, res) => {
    try {

        if (!req.params.id)
            return res.status(httpStatus.BAD_REQUEST).send({
                message: 'Id bilgisi eksik.'
            })

        const result = await remove(req.params.id);

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



const makeComment = async (req, res) => {
    try {

        const mainTask = await findOne({ _id: req.params.id })

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


const deleteComment = async (req, res) => {
    try {

        const mainTask = await findOne({ _id: req.params.id })

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


const addSubTask = async (req, res) => {
    try {

        if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({
            message: 'Id bilgisi eksik.'
        })


        const mainTask = await findOne({ _id: req.params.id })

        if (!mainTask)
            return res.status(httpStatus.NOT_FOUND).json({
                message: 'Böyle bir kayıt bulunmamaktadır.'
            })

        req.body.userId = req.user;
        const subTask = await insert({ ...req.body, userId: req.user })

        mainTask.subTasks.push(subTask);

        const updatedMainTask = await mainTask.save();

        res.status(httpStatus.CREATED).send(updatedMainTask)
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error
        })
    }
}


const fetchTask = async (req, res) => {
    try {

        if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({
            message: 'Id bilgisi eksik.'
        })

        const mainTask = await findOne({ _id: req.params.id },true)

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


module.exports = {
    index,
    create,
    update,
    deleteTask,
    makeComment,
    deleteComment,
    addSubTask,
fetchTask,



}