const httpStatus = require('http-status')
const {projectService} = require('../services')

const index = async (req, res) => {
    try {

        const projects = await projectService.list();
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
        const result = await projectService.create(req.body)
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

        const result = await projectService.update(req.params.id, req.body);

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

        const result = await projectService.delete(req.params.id);

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