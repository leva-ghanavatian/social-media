const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

function createUploader({ destination, allowedTypes, maxSizeMB = 5, filename }) {
    if (typeof destination === 'string') {
        fs.mkdirSync(destination, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination,
        filename: filename ?? ((req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase();
            cb(null, `${crypto.randomUUID()}${ext}`);
        }),
    });

    const fileFilter = (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes[ext] === file.mimetype) {
            return cb(null, true);
        }
        const err = new Error('Invalid file type');
        err.code = 'INVALID_FILE_TYPE';
        err.status = 400;
        cb(err);
    };

    return multer({ storage, fileFilter, limits: { fileSize: maxSizeMB * 1024 * 1024 } });
}

module.exports = createUploader;