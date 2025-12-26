const commentsQueries = {
    create: `
        INSERT INTO comments (content, post_id, author_id)
        VALUES ($1, $2, $3)
            RETURNING *
    `,

    getByPostId: `
        SELECT
            comments.id,
            comments.content,
            comments.post_id,
            comments.author_id,
            comments.created_at,
            comments.updated_at,
            users.username as author_name
        FROM comments
                 LEFT JOIN users ON comments.author_id = users.id
        WHERE comments.post_id = $1
        ORDER BY comments.created_at ASC
    `,

    findById: `
        SELECT * FROM comments WHERE id = $1
    `,

    delete: `
        DELETE FROM comments WHERE id = $1 RETURNING *
    `,

    update: `
        UPDATE comments
        SET content = $1, updated_at = NOW()
        WHERE id = $2
            RETURNING *
    `
};

module.exports = { commentsQueries };