const { insert, list, loginUser, modify } = require('../services/userService');
const projectService = require('../services/projectService');
const httpStatus = require('http-status');
const { passwordToHash } = require('../scripts/utils/cryptoHelper');
const { generateAccessToken, generateRefreshToken } = require('../scripts/utils/authHelper');
const project = require('../models/project');
const uuid = require('uuid')
const nodemailer = require('nodemailer');

const eventEmitter = require('../scripts/events/eventEmitter');
const { response } = require('express');

const create = async (req, res) => {
    try {

        req.body.password = passwordToHash(req.body.password);
        const result = await insert(req.body);
        res.status(httpStatus.CREATED).send(result);

    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error
        })
    }
}

const index = async (req, res) => {
    try {

        const users = await list();
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

        let user = await loginUser(req.body);

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

        const updatedUser = await modify({ email: req.body.email }, { password: passwordToHash(newPassword) })

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
        const updatedUser = await modify({ _id: req.user?._id }, req.body)

        res.status(httpStatus.OK).json(updatedUser)
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}

module.exports = {
    index,
    login,
    create,
    projectList,
    resetPassword,
    update

}