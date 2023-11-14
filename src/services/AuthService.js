import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';


class AuthService {

    setupAxiosInterceptors() {
        const currentUser = this.getCurrentUser();

        if (currentUser && currentUser.jwtToken) {
            axios.interceptors.request.use(
                config => {
                    if (!config.headers['Authorization']) {
                        config.headers['Authorization'] = `Bearer ${currentUser.jwtToken}`;
                    }
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            );
        }
    }
    login(username, password) {
        return axios
            .post(API_URL + 'login', { username, password })
            .then(response => {
                if (response.data.jwtToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(username, password) {
        return axios.post(API_URL + 'register', { username, password });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();