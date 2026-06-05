// trata erros personalizados, informando a mensagem e o status code

class AppError extends Error {
    constructor(message, statusCode = 400) {
        super(message);

        this.statusCode = statusCode;
    }
}

module.exports = AppError;