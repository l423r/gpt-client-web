import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom'; // Импортируем необходимый хук

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Состояние для хранения сообщений об ошибках

    const navigate = useNavigate(); // Хук для навигации

    const handleLogin = (e) => {
        e.preventDefault();
        AuthService.login(username, password).then(
            () => {
                navigate('/chat'); // Замените '/home' на актуальный путь, на который пользователь должен быть перенаправлен
            },
            (error) => {
                // Предполагаем, что сообщение об ошибке будет в error.response.data
                const message = error.response && error.response.data && error.response.data.message ?
                    error.response.data.message :
                    "Не удалось войти в систему.";
                setErrorMessage(message); // Устанавливаем сообщение об ошибке
            }
        );
    };

    return (
        <div>
            <h2>Login</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Отображение сообщения об ошибке если оно есть */}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;

// Также добавьте базовые стили для ".error-message" в ваш CSS-файл если нужен кастомный стиль ошибок.