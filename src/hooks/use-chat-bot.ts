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
        const normalizedText = userText.toLowerCase();
        if (normalizedText.includes('oi') || normalizedText.includes('olá') || normalizedText.includes('hello') || normalizedText.includes('hi')) {
            botResponse = 'Olá! Como posso ajudar?';
        } else if (normalizedText.includes('tempo') || normalizedText.includes('clima') || normalizedText.includes('weather')) {
            botResponse = 'O tempo está ensolarado hoje! 🌞';
        } else if (normalizedText.includes('nome') || normalizedText.includes('quem é você') || normalizedText.includes('como se chama')) {
            botResponse = 'Eu sou o ChatBot, prazer em conhecê-lo! 😊';
        } else if (normalizedText.includes('ajuda') || normalizedText.includes('socorro') || normalizedText.includes('assistência')) {
            botResponse = 'Estou aqui para ajudar! O que você precisa?';
        } else if (normalizedText.includes('como você está') || normalizedText.includes('tudo bem') || normalizedText.includes('como vai')) {
            botResponse = 'Estou apenas um código, mas estou aqui para ajudar! E você, como está?';
        } else if (normalizedText.includes('adeus') || normalizedText.includes('tchau') || normalizedText.includes('bye')) {
            botResponse = 'Até logo! Se precisar de algo, estarei aqui! 👋';
        } else if (normalizedText.includes('obrigado') || normalizedText.includes('valeu') || normalizedText.includes('thank you')) {
            botResponse = 'De nada! Fico feliz em ajudar. 😊';
        } else if (normalizedText.includes('você é real') || normalizedText.includes('existir') || normalizedText.includes('robô')) {
            botResponse = 'Eu sou apenas um assistente virtual criado para ajudar você com suas dúvidas. 🤖';
        } else if (normalizedText.includes('piada') || normalizedText.includes('conta uma piada') || normalizedText.includes('humor')) {
            botResponse = 'Claro! Aqui vai uma piada: Por que o livro de matemática ficou triste? Porque tinha muitos problemas! 😂';
        } else if (normalizedText.includes('quem criou você') || normalizedText.includes('quem te fez') || normalizedText.includes('desenvolvedor')) {
            botResponse = 'Eu fui criado por desenvolvedores talentosos que amam programação e inteligência artificial!';
        } else if (normalizedText.includes('qual a capital do brasil') || normalizedText.includes('capital do brasil')) {
            botResponse = 'A capital do Brasil é Brasília! 🏛️';
        } else if (normalizedText.includes('você gosta de música') || normalizedText.includes('música')) {
            botResponse = 'Eu adoro música! Mas, como sou um bot, gosto de todos os estilos igualmente. 🎶';
        } else if (normalizedText.includes('você joga') || normalizedText.includes('jogos')) {
            botResponse = 'Eu sou mais de resolver problemas do que de jogar, mas posso recomendar bons jogos! 😄';
        }
        addMessage(botResponse, 'bot');
    }

    return {
        messages,
        sendMessage,
        addMessage,
    };
};
