// These Error are used in services

const errorHandler = (err, req, res, next) => {
    console.log(err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error!!!"
    });
}

class AppError extends Error {
    constructor(statusCode, message = "Something went wrong!!!") {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.success = false;
    }
}

class NotFoundError extends AppError {
    constructor(message = "Resource Not Found!!!") {
        super(404, message);
    }
}

class ConflictError extends AppError {
    constructor(message = "Conflict Occurred!!!") {
        super(409, message);
    }
}

class BadRequestError extends AppError {
    constructor(message = "Bad Request!!!") {
        super(400, message);
    }
}

class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized Error!!!") {
        super(401, message);
    }
}

export { errorHandler, AppError, NotFoundError, ConflictError, BadRequestError, UnauthorizedError };