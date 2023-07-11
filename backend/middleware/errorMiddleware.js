const notFound = (req, res, next) => {
    const eror = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(eror);

}

const erorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    if (err.name === 'CaseError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found'
    }
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}

export { notFound, erorHandler };