const fs = require("fs");

const safeUnlink = async filePath => {
    try {
        await fs.promises.unlink(filePath);
    } catch (err) {
        if (err.code !== "ENOENT") {
            console.error(`Failed to delete file at ${filePath}:`, err);
        }
    }
};

module.exports = { safeUnlink };