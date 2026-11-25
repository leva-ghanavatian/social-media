const path = require("path");
const createUploader = require("../core/uploader");
const publicDir = path.join(__dirname, '..', 'public');

const imageTypes = Object.freeze({
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
});

const courseCoverUpload = createUploader({
    destination: path.join(publicDir, 'courses', 'covers'),
    allowedTypes: imageTypes,
    maxSizeMB: 5,
});

const userAvatarUpload = createUploader({
    destination: path.join(publicDir, 'users', 'avatars'),
    allowedTypes: imageTypes,
    maxSizeMB: 2,
    // deterministic name → a new avatar overwrites the old one
    filename: (req, file, cb) => {
        cb(null, `user-${req.user.sub}${path.extname(file.originalname).toLowerCase()}`);
    },
});

const courseVideoUpload = createUploader({
    destination: path.join(publicDir, 'courses', 'videos'),
    allowedTypes: { '.mp4': 'video/mp4', '.webm': 'video/webm' },
    maxSizeMB: 500,
});

const documentTypes = Object.freeze({
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip'
});

const contactAttachmentUpload = createUploader({
    destination: path.join(publicDir, 'contacts', 'attachments'),
    allowedTypes: documentTypes,
    maxSizeMB: 10, // Allow up to 10MB for attachments
});

module.exports = { courseCoverUpload, userAvatarUpload, courseVideoUpload, contactAttachmentUpload };

// req.file = {
//   "fieldname": "cover",
//   "originalname": "my-picture.jpg",
//   "encoding": "7bit",
//   "mimetype": "image/jpeg",
//   "destination": "public/courses/covers",
//   "filename": "cover-1718930000-123456789.jpg",
//   "path": "public/courses/covers/cover-1718930000-123456789.jpg",
//   "size": 2048000
// }