function errorMiddleware(error, req, res, next) {
    return res.status(error.statusCode || 500).json({
        error: error.message || 'Erro interno do servidor'
    });
}

module.exports = errorMiddleware;