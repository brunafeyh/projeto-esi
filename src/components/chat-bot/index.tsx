import { FC, useState } from 'react';
import { Box, Typography, IconButton, Stack, CircularProgress } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';  // Import SendIcon
import { ChatContainer, ControlsContainer, MessageBox, MessagesContainer, TextField } from './styles';
import { useChatBot } from '../../hooks/use-chat-bot';
import { useVoiceRecognition } from '../../hooks/use-voice-recognition'; 
import { Modal, useModal } from '../modal';
import { ModalTitle } from '../modal/styles';
import { useAuth } from '../../hooks/use-auth';
import { closeModal, openModal } from '../../utils/modal';

const ChatBot: FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const modalRef = useModal();
    const { messages, sendMessage, addMessage } = useChatBot();
    const { user } = useAuth();

    const handleTranscription = (transcript: string) => {
        sendMessage(transcript, getName(), getRole());
    };

    const handleError = (error: string) => {
        addMessage(error, 'bot');
    };

    const { isRecording, audioURL, startRecording, stopRecording, cancelRecording } = useVoiceRecognition(
        handleTranscription,
        handleError
    );

    const getName = () => {
        return user ? user.name : 'colega';
    };

    const getRole = () => {
        return user ? user.role : 'ROLE_CUSTOMER';
    };

    const handleSendClick = async () => {
        if (inputText.trim()) {
            setIsProcessing(true);
            try {
                await sendMessage(inputText, getName(), getRole());
                setInputText('');  
            } catch (error) {
                console.error('Erro ao enviar mensagem para o bot:', error);
                addMessage('Erro ao enviar a mensagem.', 'bot');
            } finally {
                setIsProcessing(false);
            }
        }
    };

    const handleAudioMessage = async () => {
        if (audioURL) {
            setIsProcessing(true);
            try {
                await sendMessage(audioURL, getName(), getRole());
            } catch (error) {
                console.error('Erro ao transcrever ou enviar mensagem:', error);
                addMessage('Erro ao transcrever ou enviar áudio.', 'bot');
            } finally {
                setIsProcessing(false); 
            }
        }
    };

    const handleStopRecording = () => {
        stopRecording();
        handleAudioMessage(); 
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') handleSendClick();
    };

    return (
        <Stack>
            <IconButton onClick={openModal(modalRef)} style={{ color: '#FFF' }}>
                <ChatIcon />
            </IconButton>
            <Modal ref={modalRef}>
                <ChatContainer>
                    <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
                        <ModalTitle>ChatBot</ModalTitle>
                        <IconButton onClick={closeModal(modalRef)} sx={{ width: 16, height: 16 }}>
                            <CloseIcon sx={{ width: 16, height: 16 }} />
                        </IconButton>
                    </Box>
                    <MessagesContainer>
                        <Typography mb={2}>Olá! Eu sou o chatBot!</Typography>
                        {messages.map((message, index) => (
                            <MessageBox
                                key={index}
                                align={message.sender === 'user' ? 'right' : 'left'}
                                bgcolor={message.sender === 'user' ? '#d4edda' : '#e2e3e5'}
                            >
                                <Typography variant="body1">
                                    <strong>{message.sender === 'user' ? 'Você' : 'Bot'}:</strong> {message.text}
                                </Typography>
                            </MessageBox>
                        ))}
                    </MessagesContainer>

                    {audioURL && (
                        <Box mt={2} display="flex" alignItems="center" justifyContent="space-between">
                            <audio controls src={audioURL}></audio>
                            <IconButton color="secondary" onClick={cancelRecording}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    )}

                    <ControlsContainer>
                        <TextField
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Digite ou use a voz..."
                            variant="filled"
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        color={isRecording ? 'secondary' : 'primary'}
                                        onClick={isRecording ? handleStopRecording : startRecording}
                                        edge="end"
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? <CircularProgress size={24} /> : <MicIcon />}
                                    </IconButton>
                                ),
                            }}
                        />
                        <IconButton 
                            color="primary" 
                            onClick={handleSendClick} 
                            sx={{ height: 40 }} 
                            disabled={isProcessing}
                        >
                            {isProcessing ? <CircularProgress size={24} /> : <SendIcon fontSize="small" />}
                        </IconButton>
                    </ControlsContainer>
                </ChatContainer>
            </Modal>
        </Stack>
    );
};

export default ChatBot;
