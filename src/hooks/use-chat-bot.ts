import { useState } from 'react';
import { Message } from '../types/chat';
import AiAssistantService from '../services/ai-assistent';

export const useChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const aiAssistantService = new AiAssistantService();

    const addMessage = (text: string, sender: 'user' | 'bot') => {
        setMessages((prevMessages) => [...prevMessages, { text, sender }]);
    };

    const sendMessage = async (messageText: string, username: string, userRole: string) => {
        if (messageText.trim()) {
            addMessage(messageText, 'user');
            try {
                const response = await aiAssistantService.handleChatMessage({
                    username,
                    userRole,
                    userMessage: messageText,
                });
                addMessage(response.response, 'bot');
            } catch (error) {
                console.error('Erro ao enviar mensagem para o bot:', error);
                addMessage('Erro ao processar a resposta da IA.', 'bot');
            }
        }
    };

    return {
        messages,
        sendMessage,
        addMessage,
    };
};
