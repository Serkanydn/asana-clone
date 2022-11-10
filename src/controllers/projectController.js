const { insert, list } = require('../services/projectService');
const httpStatus = require('http-status')

const create = async (req, res) => {
    try {
        console.log("req body ",req.body);
        const result = await insert(req.body)
        console.log(result);
        res.status(httpStatus.CREATED).send(result)
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error
        })
    }
}

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



module.exports = {
    create,
    index
}