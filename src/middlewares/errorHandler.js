const { AppError, ValidationError } = require("../core/errors");
const multer = require("multer");
const requireJsonBody = (req, res, next) => {
    const body = req.body;
    if (body === null || typeof body !== "object" || Array.isArray(body)) {
        return next(new ValidationError("Request body must be a JSON object"));
    }
    next();
};

const notFound = (req, res) => res.status(404).json({ error: "Route not found" });

const errorHandler = (error, req, res, next) => {
    if (res.headersSent) return next(error);
    if (error instanceof AppError) return res.status(error.status).json({ error: error.message });
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({
                error: 'Photo must not exceed 5 MB'
            });
        }

        return res.status(400).json({
            error: error.message
        });
    }
    if (error.message === 'Invalid file type')
        return res.status(400).json({ error: error.message });

    if (error.type === "entity.parse.failed") return res.status(400).json({ error: "Invalid JSON" });
    if (error.type === "entity.too.large") return res.status(413).json({ error: "Request body too large" });
    if (error.code === 11000) return res.status(409).json({ error: "Resource already exists" });
    res.status(500).json({
        error: "Internal server error",
        details: {
            name: error.name,
            message: error.message,
            ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
        }
    });
};

module.exports = { requireJsonBody, notFound, errorHandler }; 