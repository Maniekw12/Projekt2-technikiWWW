const express = require('express');
const path = require('path');
const app = express();
const PORT = 5500;

// Serve static files from current directory
app.use(express.static(__dirname));

// Serve CSS files
app.use('/css', express.static(path.join(__dirname, 'css')));

// Serve JS files
app.use('/js', express.static(path.join(__dirname, 'js')));

// Routes for HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'profile.html'));
});

app.get('/post', (req, res) => {
    res.sendFile(path.join(__dirname, 'post.html'));
});

app.get('/edit-post', (req, res) => {
    res.sendFile(path.join(__dirname, 'edit-post.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'users.html'));
});

app.get('/user-profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'user-profile.html'));
});

app.get('/privacy', (req, res) => {
    res.sendFile(path.join(__dirname, 'privacy.html'));
});

app.get('/terms', (req, res) => {
    res.sendFile(path.join(__dirname, 'terms.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Frontend działa na http://localhost:${PORT}`);
    console.log(`📁 Serwowane pliki z: ${__dirname}`);
    console.log(`\n📄 Dostępne strony:`);
    console.log(`   - http://localhost:${PORT}/ (Strona główna)`);
    console.log(`   - http://localhost:${PORT}/login (Logowanie)`);
    console.log(`   - http://localhost:${PORT}/register (Rejestracja)`);
    console.log(`   - http://localhost:${PORT}/profile (Profil)`);
    console.log(`   - http://localhost:${PORT}/users (Lista użytkowników)`);
    console.log(`   - http://localhost:${PORT}/about (O nas)`);
    console.log(`   - http://localhost:${PORT}/contact (Kontakt)`);
    console.log(`   - http://localhost:${PORT}/privacy (Polityka prywatności)`);
    console.log(`   - http://localhost:${PORT}/terms (Regulamin)`);
});