const { insert, list, modify } = require('../services/projectService');
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
        console.log('req.params.id', req.params.id)
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






module.exports = {
    index,
    create,
    update,
}