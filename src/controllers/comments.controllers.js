const { createComment, getCommentsByPostId, deleteComment, updateComment, getCommentById } = require('../services/comments.services');

const addComment = async (req, res) => {
    const { content, postId } = req.body;
    const authorId = req.user.userId;

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
    const userId = req.user.userId;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Incorrect id' });
    }

    try {
        const comment = await getCommentById(id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment doesn\'t exist' });
        }

        if (comment.author_id !== userId) {
            return res.status(403).json({ error: 'You can only delete your own comments' });
        }

        const deleted = await deleteComment(id);
        res.status(200).json({ message: 'Comment successfully deleted', comment: deleted });
    } catch (err) {
        console.error('Error during deleting comment:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const editComment = async (req, res) => {
    const commentId = parseInt(req.params.id);
    const { content } = req.body;
    const userId = req.user.userId;

    if (isNaN(commentId)) {
        return res.status(400).json({ error: 'Incorrect comment id' });
    }

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        const comment = await getCommentById(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment doesn\'t exist' });
        }

        if (comment.author_id !== userId) {
            return res.status(403).json({ error: 'You can only edit your own comments' });
        }

        const updated = await updateComment(commentId, content);
        res.status(200).json(updated);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = { addComment, listCommentsByPost, removeComment, editComment };