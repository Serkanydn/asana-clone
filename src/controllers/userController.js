const { insert, list, loginUser } = require('../services/userService');
const httpStatus = require('http-status');
const { passwordToHash } = require('../scripts/utils/cryptoHelper');
const { generateAccessToken, generateRefreshToken } = require('../scripts/utils/authHelper');


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

module.exports = {
    create,
    index,
    login
}