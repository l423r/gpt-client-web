import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AuthService from "../services/AuthService";


const CHAT_API_URL = 'http://localhost:8080/api/chat/';

function Chat() {
    const [message, setMessage] = useState("");
    const [conversation, setConversation] = useState([]);

    const sendMessageToServer = async (userMessage) => {
        try {
            // Шлём сообщение на сервер и получаем ответ
            const response = await axios.post(CHAT_API_URL + 'send', { message: userMessage });
            return response.data; // Содержит ответ от сервера
        } catch (error) {
            console.error("Ошибка при отправке сообщения на сервер:", error);
            return null; // В случае ошибки возвращаем null
        }
    };

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newMessage = { text: message, sender: "user" };
        setConversation([...conversation, newMessage]);

        setMessage(""); // Очистка поля ввода после отправки

        const serverResponse = await sendMessageToServer(message);
        if (serverResponse && serverResponse.message) {
            setConversation(conversation => [...conversation, { text: serverResponse.message, sender: "bot" }]);
        }
    };

    // Вызов метода для установки интерсептора после успешной аутентификации
    useEffect(() => {
        AuthService.setupAxiosInterceptors();
        // ... остальные действия при монтировании компонента ...
    }, []);

    return (
        <div>
            <h2>Chat with GPT</h2>
            <form onSubmit={handleMessageSubmit}>
                <div>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit">Send</button>
                </div>
            </form>
            <div>
                {conversation.map((m, index) => (
                    <div key={index} className={m.sender === "user" ? "user-message" : "gpt-message"}>
                        {m.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Chat;