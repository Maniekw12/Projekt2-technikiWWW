const app = require('./app');
const { initDatabase } = require('./db/db');

const PORT = 3000;

initDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Could not start the server:', err);
        process.exit(1);
    });