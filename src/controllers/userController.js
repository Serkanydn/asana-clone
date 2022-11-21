const { insert, list, loginUser, modify, remove } = require('../services/userService');
const { userService, projectService } = require('../services');
const httpStatus = require('http-status');
const { passwordToHash } = require('../scripts/utils/cryptoHelper');
const { generateAccessToken, generateRefreshToken } = require('../scripts/utils/authHelper');
const uuid = require('uuid')
const path = require('path')
const eventEmitter = require('../scripts/events/eventEmitter');


const create = async (req, res) => {
    try {

        req.body.password = passwordToHash(req.body.password);
        const result = await userService.create(req.body);
        res.status(httpStatus.CREATED).send(result);

    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error
        })
    }
}

const index = async (req, res) => {
    try {

        const users = await userService.list();
        res.status(httpStatus.OK).send(users);

    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error
        })
    }
}

const login = async (req, res) => {
    try {

        req.body.password = passwordToHash(req.body.password);

        let user = await userService.findOne(req.body);

        if (!user) return res.status(httpStatus.NOT_FOUND).send({ message: 'Böyle bir kullanıcı bulunamadı.' });

        user = {
            ...user.toObject(),
            tokens: {
                accessToken: generateAccessToken(user),
                refreshToken: generateRefreshToken(user),
            }
        }
        delete user.password;

        res.status(httpStatus.OK).send(user);

    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error
        })
    }
}

const projectList = async (req, res) => {
    try {
        const projects = await projectService.list({ userId: req.user?._id })

        res.status(httpStatus.OK).send(projects)
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}

const resetPassword = async (req, res) => {

    try {

        const newPassword = uuid.v4()?.split('-')[0] || `usr-${new Date().getTime()}`;

        const updatedUser = await userService.updateWhere({ email: req.body.email }, { password: passwordToHash(newPassword) })

        if (!updatedUser) return res.status(httpStatus.NOT_FOUND).json({
            succeded: false,
            message: 'Böyle bir kullanıcı mevcut değil.'
        });


        eventEmitter.emit('send_email', {
            to: updatedUser.email,
            subject: 'Şifre Sıfırlama',
            html: `Talebiniz üzerine şifre sıfırlama işleminiz gerçekleştirilmiştir. <br/> Giriş yaptıktan sonra şifrenizi değiştiriniz. <br/> Şifreniz: <b>${newPassword}</b>`,
        })

        res.status(httpStatus.OK).json({
            message: "Şifre sıfırlama işlemi için sisteme kayıtlı e-posta adresinize şifrenizi gönderdik."
        })

    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}

const update = async (req, res) => {
    try {
        const updatedUser = await userService.update(req.user?._id, req.body)

        res.status(httpStatus.OK).json(updatedUser)
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}

const changePassword = async (req, res) => {
    try {

        req.body.password = passwordToHash(req.body.password);
        //! UI da şifre karşılaştırmalarına ilişkin kurallar burada olacaktır.
        const updatedUser = await userService.update(req.user?._id, req.body)

        res.status(httpStatus.OK).json(updatedUser)
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}



const deleteUser = async (req, res) => {
    try {

        if (!req.params.id)
            return res.status(httpStatus.BAD_REQUEST).send({
                message: 'Id bilgisi eksik.'
            })

        const result = await userService.delete(req.params.id);

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
const updateProfileImage = async (req, res) => {
    try {

        if (!req?.files?.profile_image)
            return res.status(httpStatus.BAD_REQUEST).send({
                error: 'Bu işlemi yapabilmek için yeterli veriye sahip değilsiniz.'
            })


        const extension = path.extname(req.files.profile_image.name)
        const fileName = `${req?.user._id}${extension}`;
        const folderPath = path.join(__dirname, '../', 'uploads/users', fileName);

        req.files.profile_image.mv(folderPath, async (err) => {
            if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ err })

            const updatedUser = await userService.update( req.user._id , { profileImage: fileName })


            return res.status(httpStatus.OK).send(updatedUser)
        })

    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error
        })
    }
}

module.exports = {
    index,
    login,
    create,
    projectList,
    resetPassword,
    update,
    deleteUser,
    changePassword,
    updateProfileImage,


}