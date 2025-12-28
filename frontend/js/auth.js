// Auth utilities
const updateNavbar = () => {
    const authLinks = document.getElementById('auth-links');
    const userLinks = document.getElementById('user-links');
    const usernameDisplay = document.getElementById('username-display');

    if (isAuthenticated()) {
        if (authLinks) authLinks.classList.add('hidden');
        if (userLinks) userLinks.classList.remove('hidden');
        if (usernameDisplay) usernameDisplay.textContent = getUsername();
    } else {
        if (authLinks) authLinks.classList.remove('hidden');
        if (userLinks) userLinks.classList.add('hidden');
    }
};

// Check authentication and redirect if needed
const requireAuth = () => {
    if (!isAuthenticated()) {
        window.location.href = '/login.html';
        return false;
    }
    return true;
};

// Logout function
const logout = () => {
    if (confirm('Czy na pewno chcesz się wylogować?')) {
        clearAuthData();
        window.location.href = '/index.html';
    }
};

// Show message
const showMessage = (message, type = 'success') => {
    const messageBox = document.getElementById('message-box');
    if (!messageBox) return;

    const messageClass = type === 'success' ? 'message-success' : 'message-error';
    messageBox.innerHTML = `<div class="message ${messageClass}">${message}</div>`;

    setTimeout(() => {
        messageBox.innerHTML = '';
    }, 4000);
};

// Format date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'przed chwilą';
    if (diffMins < 60) return `${diffMins} min temu`;
    if (diffHours < 24) return `${diffHours} godz. temu`;
    if (diffDays < 7) return `${diffDays} dni temu`;

    return date.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Initialize navbar on page load
document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
});