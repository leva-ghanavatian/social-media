const buildCommentTree = (comments) => {
    const map = {};
    const roots = [];

    // 1. Create a dictionary of all comments mapped by their ID
    // We also add an empty 'replies' array to every comment
    comments.forEach(comment => {
        map[comment._id.toString()] = { ...comment, replies: [] };
    });

    // 2. Link them together
    comments.forEach(comment => {
        if (comment.parent) {
            const parentId = comment.parent.toString();
            // If the parent exists in our map, add this comment to the parent's replies
            if (map[parentId]) {
                map[parentId].replies.push(map[comment._id.toString()]);
            }
        } else {
            // If it has no parent, it's a top-level comment
            roots.push(map[comment._id.toString()]);
        }
    });

    return roots;
};

module.exports = { buildCommentTree };