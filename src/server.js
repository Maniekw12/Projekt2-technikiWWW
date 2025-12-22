const app = require('./app');
const { initDatabase } = require('./db/db');

const PORT = 3000;

// Inicjalizacja bazy danych przed uruchomieniem serwera
initDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Server działa na porcie ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Nie można uruchomić serwera:', err);
        process.exit(1);
    });