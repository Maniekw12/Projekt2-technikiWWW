const { createPost, getPosts, deletePost } = require('../services/posts.services');

const addPost = async (req, res) => {
    const { title, content, authorId } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title i content są wymagane' });
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

const removePost = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Incorrect id' });
    }

    try {
        const deleted = await deletePost(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Post doesn\'t exist' });
        }
        res.status(200).json({ message: 'Post successfully deleted', post: deleted });
    } catch (err) {
        console.error('Error during deleting post:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }

}

module.exports = { addPost, listPosts, removePost };
