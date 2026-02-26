// API Service Layer
class APIService {
    constructor() {
        this.baseURL = window.APP_CONFIG.API_URL;
        this.token = localStorage.getItem('token');
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, { ...options, headers });
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    this.handleUnauthorized();
                }
                throw new Error(data.message || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    handleUnauthorized() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login.html';
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    // Auth APIs
    async login(email, password) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        if (data.token) this.setToken(data.token);
        return data;
    }

    async register(userData) {
        const data = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        if (data.token) this.setToken(data.token);
        return data;
    }

    // User APIs
    async getProfile() {
        return this.request('/users/profile');
    }

    async updateProfile(updates) {
        return this.request('/users/profile', {
            method: 'PUT',
            body: JSON.stringify(updates)
        });
    }

    async getNearbyUsers(city) {
        return this.request(`/users/nearby?city=${encodeURIComponent(city)}`);
    }

    // Skills APIs
    async getSkills() {
        return this.request('/skills/my');
    }

    async createSkill(skillData) {
        return this.request('/skills', {
            method: 'POST',
            body: JSON.stringify(skillData)
        });
    }

    async deleteSkill(id) {
        return this.request(`/skills/${id}`, { method: 'DELETE' });
    }

    // Swap Requests APIs
    async getRequests() {
        return this.request('/requests/my');
    }

    async createRequest(requestData) {
        return this.request('/requests', {
            method: 'POST',
            body: JSON.stringify(requestData)
        });
    }

    async updateRequestStatus(id, status) {
        return this.request(`/requests/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });
    }

    // Messages APIs
    async getMessages(requestId) {
        return this.request(`/messages/${requestId}`);
    }

    async sendMessage(messageData) {
        return this.request('/messages', {
            method: 'POST',
            body: JSON.stringify(messageData)
        });
    }
}

// Global API instance
window.api = new APIService();
