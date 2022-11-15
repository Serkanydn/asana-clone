const { insert, list, modify, remove } = require('../services/projectService');
const httpStatus = require('http-status')

const index = async (req, res) => {
    try {

        const projects = await list();
        res.status(httpStatus.OK).send(projects);

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

        const result = await modify(req.params.id, req.body);

        res.status(httpStatus.OK).send(result)
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error
        })
    }
}

const deleteProject = async (req, res) => {
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






module.exports = {
    index,
    create,
    update,
    deleteProject,

}