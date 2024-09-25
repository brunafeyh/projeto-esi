import { useState } from 'react';
import { Message } from '../types/chat';

export const useChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const addMessage = (text: string, sender: 'user' | 'bot') => {
        setMessages((prevMessages) => [...prevMessages, { text, sender }]);
    };

    const sendMessage = (messageText: string) => {
        if (messageText.trim()) {
            addMessage(messageText, 'user');
            generateBotResponse(messageText);
        }
    };

    const generateBotResponse = (userText: string) => {
        let botResponse = 'Desculpe, não entendi sua pergunta.';

        if (userText.includes('oi') || userText.includes('olá')) {
            botResponse = 'Olá! Como posso ajudar?';
        } else if (userText.includes('tempo')) {
            botResponse = 'O tempo está ensolarado hoje!';
        } else if (userText.includes('nome')) {
            botResponse = 'Eu sou o ChatBot, prazer em conhecê-lo!';
        } else if (userText.includes('ajuda')) {
            botResponse = 'Estou aqui para ajudar! O que você precisa?';
        }

        addMessage(botResponse, 'bot');
    };

    return {
        messages,
        sendMessage,
        addMessage,
    };
};
