class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.status = statusCode;
    }

    static notFound(message = 'Böyle bir kayıt bulunmamaktadır.') {
        this.message = message;
        this.status = 404;
        return this;
    }

}

module.exports = ApiError;

