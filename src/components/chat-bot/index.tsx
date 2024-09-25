import { FC, useState } from 'react';
import { Box, Typography, IconButton, Dialog } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { ChatContainer, ControlsContainer, MessageBox, MessagesContainer, StyledButton, StyledTextField } from './styles';
import { useChatBot } from '../../hooks/use-chat-bot';
import { useVoiceRecognition } from '../../hooks/use-voice-recognition';
import ChatIcon from '@mui/icons-material/Chat'

const ChatBot: FC = () => {
    const [inputText, setInputText] = useState<string>('');
    const [open, setOpen] = useState(false);
    const { messages, sendMessage, addMessage } = useChatBot();
    const { isRecording, audioURL, startRecording, stopRecording, cancelRecording } = useVoiceRecognition(
        (transcript) => sendMessage(transcript),
        (error) => addMessage(error, 'bot')
    );

    const handleSendClick = () => {
        if (inputText.trim()) {
            sendMessage(inputText);
            setInputText('');
        }
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <> <IconButton onClick={handleOpen} style={{ color: '#FFF' }}>
            <ChatIcon />
        </IconButton>
            <Dialog open={open} onClose={handleClose} sx={{ minWidth: '400px' }}>
                <ChatContainer>
                    <MessagesContainer>
                        <Typography>Olá! Eu sou o chatBot!</Typography>
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
                        <StyledTextField
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Digite ou use a voz..."
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        color={isRecording ? "secondary" : "primary"}
                                        onClick={isRecording ? stopRecording : startRecording}
                                        edge="end"
                                    >
                                        <MicIcon />
                                    </IconButton>
                                ),
                            }}
                        />
                        <StyledButton variant="contained" color="primary" onClick={handleSendClick}>
                            <SendIcon />
                        </StyledButton>
                    </ControlsContainer>
                </ChatContainer>
            </Dialog>
        </>
    );
};

export default ChatBot;
