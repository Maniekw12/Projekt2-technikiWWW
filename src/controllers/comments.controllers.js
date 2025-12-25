const { createComment, getCommentsByPostId, deleteComment, updateComment } = require('../services/comments.services');

const addComment = async (req, res) => {
    const { content, postId, authorId } = req.body;

    if (!content || !postId) {
        return res.status(400).json({ error: 'Content and postId are required' });
    }

    try {
        const comment = await createComment(content, postId, authorId);
        res.status(201).json(comment);
    } catch (err) {
        console.error('Error during creating comment:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const listCommentsByPost = async (req, res) => {
    const { postId } = req.params;

    if (isNaN(postId)) {
        return res.status(400).json({ error: 'Incorrect post id' });
    }

    try {
        const comments = await getCommentsByPostId(postId);
        res.status(200).json(comments);
    } catch (err) {
        console.error('Error during fetching comments:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const removeComment = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Incorrect id' });
    }

    try {
        const deleted = await deleteComment(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Comment doesn\'t exist' });
        }
        res.status(200).json({ message: 'Comment successfully deleted', comment: deleted });
    } catch (err) {
        console.error('Error during deleting comment:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const editComment = async (req, res) => {
    const commentId = parseInt(req.params.id);
    const { content } = req.body;

    if (isNaN(commentId)) {
        return res.status(400).json({ error: 'Incorrect comment id' });
    }

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        const updated = await updateComment(commentId, content);
        if (!updated) {
            return res.status(404).json({ error: 'Comment doesn\'t exist' });
        }
        res.status(200).json(updated);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = { addComment, listCommentsByPost, removeComment, editComment };