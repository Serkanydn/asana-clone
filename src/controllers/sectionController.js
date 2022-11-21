const httpStatus = require('http-status')
const { sectionService } = require('../services')

const index = async (req, res) => {
    try {
        if (!req?.params?.projectId)
            return res.status(httpStatus.BAD_REQUEST).json({
                error: 'Proje Bilgisi Eksik.'
            })

        console.log(req.params.projectId);
        const sections = await sectionService.list({ projectId: req.params.projectId });

        console.log("sections",sections);
        if (!sections)
            return res.status(httpStatus.BAD_REQUEST).json({
                error: 'Böyle bir kayıt bulunamadı.'
            })

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
        const result = await sectionService.create(req.body)
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

        const updatedDoc = await sectionService.update(req.params.id, req.body);

        res.status(httpStatus.OK).send(updatedDoc)
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error
        })
    }
}

const deleteSection = async (req, res) => {
    try {

        if (!req.params.id)
            return res.status(httpStatus.BAD_REQUEST).send({
                message: 'Id bilgisi eksik.'
            })

        const result = await sectionService.delete(req.params.id);

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
    deleteSection,

}