const { createPost, getPosts, getPostById, deletePost, updatePost, getPostsByAuthorId } = require('../services/posts.services');

const addPost = async (req, res) => {
    const { title, content } = req.body;
    const authorId = req.user.userId;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const post = await createPost(title, content, authorId);
        res.status(201).json(post);
    } catch (err) {
        console.error('Error during posting:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const listPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'desc';

    try {
        const posts = await getPosts(page, limit, sort);
        res.status(200).json(posts);
    } catch (err) {
        console.error('Error during fetching posts:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const getPost = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Incorrect id' });
    }

    try {
        const post = await getPostById(id);
        if (!post) {
            return res.status(404).json({ error: 'Post doesn\'t exist' });
        }
        res.status(200).json(post);
    } catch (err) {
        console.error('Error during fetching post:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const removePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Incorrect id' });
    }

    try {
        const post = await getPostById(id);
        if (!post) {
            return res.status(404).json({ error: 'Post doesn\'t exist' });
        }

        if (post.author_id !== userId) {
            return res.status(403).json({ error: 'You can only delete your own posts' });
        }

        const deleted = await deletePost(id);
        res.status(200).json({ message: 'Post successfully deleted', post: deleted });
    } catch (err) {
        console.error('Error during deleting post:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const editPost = async (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;
    const userId = req.user.userId;

    if (isNaN(postId)) {
        return res.status(400).json({ error: 'Incorrect post id' });
    }

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const post = await getPostById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post doesn\'t exist' });
        }

        if (post.author_id !== userId) {
            return res.status(403).json({ error: 'You can only edit your own posts' });
        }

        const updated = await updatePost(postId, title, content);
        res.status(200).json(updated);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const listAuthorPosts = async (req, res) => {
    const { id } = req.params;
    try {
        const posts = await getPostsByAuthorId(id);
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { addPost, listPosts, getPost, removePost, editPost, listAuthorPosts };