// API Configuration
const API_URL = 'http://localhost:3000/api';

// Utility Functions
const getToken = () => localStorage.getItem('token');
const getUserId = () => localStorage.getItem('userId');
const getUsername = () => localStorage.getItem('username');

const setAuthData = (token, userId, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);
};

const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
};

const isAuthenticated = () => !!getToken();

// API Request Helper
const apiRequest = async (endpoint, options = {}) => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token && !options.skipAuth) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Auth API
const authAPI = {
    register: async (username, email, password) => {
        return apiRequest('/users/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            skipAuth: true
        });
    },

    login: async (email, password) => {
        return apiRequest('/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            skipAuth: true
        });
    }
};

// Posts API
const postsAPI = {
    getAll: async (page = 1, limit = 10) => {
        return apiRequest(`/posts?page=${page}&limit=${limit}`, {
            skipAuth: true
        });
    },

    getById: async (id) => {
        return apiRequest(`/posts/${id}`, {
            skipAuth: true
        });
    },

    create: async (title, content) => {
        return apiRequest('/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content })
        });
    },

    update: async (id, title, content) => {
        return apiRequest(`/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content })
        });
    },

    delete: async (id) => {
        return apiRequest(`/posts/${id}`, {
            method: 'DELETE'
        });
    },

    getByAuthor: async (authorId) => {
        return apiRequest(`/posts/user/${authorId}`, {
            skipAuth: true
        });
    }
};

// Comments API
const commentsAPI = {
    getByPost: async (postId) => {
        return apiRequest(`/comments/post/${postId}`, {
            skipAuth: true
        });
    },

    create: async (postId, content) => {
        return apiRequest('/comments', {
            method: 'POST',
            body: JSON.stringify({ postId, content })
        });
    },

    update: async (id, content) => {
        return apiRequest(`/comments/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ content })
        });
    },

    delete: async (id) => {
        return apiRequest(`/comments/${id}`, {
            method: 'DELETE'
        });
    }
};

// Users API
const usersAPI = {
    getAll: async () => {
        return apiRequest('/users', {
            skipAuth: true
        });
    },

    getById: async (id) => {
        return apiRequest(`/users/${id}`, {
            skipAuth: true
        });
    },

    getProfile: async () => {
        return apiRequest('/users/me/profile');
    }
};