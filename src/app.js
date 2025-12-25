const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/posts.routes');
const userRoutes = require('./routes/users.routes');
const commentRoutes = require('./routes/comments.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;