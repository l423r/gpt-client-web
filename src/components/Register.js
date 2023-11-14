import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Правильное место для использования хука useNavigate

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await AuthService.register(username, password);
            navigate('/login'); // Перенаправляем пользователя на страницу входа
        } catch (error) {
            // Устанавливаем сообщение об ошибке
            console.error(error);
            // Здесь может быть обновление состояния компонента для отображения сообщения об ошибке
        }
    };


    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
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
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;