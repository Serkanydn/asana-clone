const httpStatus = require("http-status");

const validate = (schema) => (req, res, next) => {
    const { value, error } = schema.validate(req.body);

    if (error) {
        console.log(error);
        const errorMessage = error.details?.map(detail => detail.message).join(', ')
        return res.status(httpStatus.BAD_REQUEST).json({ error: errorMessage })
    }

    // Object.assign(req, value);

    console.log("validate ",value);
    return next();
}

module.exports = validate;