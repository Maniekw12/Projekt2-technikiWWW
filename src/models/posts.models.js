const postsQueries = {
    create: `
        INSERT INTO posts (title, content, author_id)
        VALUES ($1, $2, $3)
        RETURNING *
    `,

    getAll: `
        SELECT
            posts.id,
            posts.title,
            posts.content,
            posts.author_id,
            posts.created_at,
            posts.updated_at,
            users.username as author_name
        FROM posts
        LEFT JOIN users ON posts.author_id = users.id
        ORDER BY posts.created_at
    `,

    findById: `
        SELECT
            posts.id,
            posts.title,
            posts.content,
            posts.author_id,
            posts.created_at,
            posts.updated_at,
            users.username as author_name
        FROM posts
        LEFT JOIN users ON posts.author_id = users.id
        WHERE posts.id = $1
    `,

    delete: `
        DELETE FROM posts WHERE id = $1 RETURNING *
    `,

    update: `
        UPDATE posts
        SET title = $1, content = $2, updated_at = NOW()
        WHERE id = $3
        RETURNING *
    `,

    getByAuthorId: `
        SELECT p.*, u.username as author_name 
        FROM posts p 
        JOIN users u ON p.author_id = u.id 
        WHERE p.author_id = $1 
        ORDER BY p.created_at DESC
    `
};

module.exports = { postsQueries };