import { FC, useState } from 'react'
import { Box, Typography, IconButton, Stack } from '@mui/material'
import MicIcon from '@mui/icons-material/Mic'
import CloseIcon from '@mui/icons-material/Close'
import { Button, ChatContainer, ControlsContainer, Icon, MessageBox, MessagesContainer, TextField } from './styles'
import { useChatBot } from '../../hooks/use-chat-bot'
import { useVoiceRecognition } from '../../hooks/use-voice-recognition'
import ChatIcon from '@mui/icons-material/Chat'
import { Modal, useModal } from '../modal'
import { ModalTitle } from '../modal/styles'
import { closeModal, openModal } from '../../utils/modal'

const ChatBot: FC = () => {
    const [inputText, setInputText] = useState<string>('')
    const modalRef = useModal()
    const { messages, sendMessage, addMessage } = useChatBot()
    const { isRecording, audioURL, startRecording, stopRecording, cancelRecording } = useVoiceRecognition(
        (transcript) => sendMessage(transcript),
        (error) => addMessage(error, 'bot')
    )

    const handleSendClick = () => {
        if (inputText.trim()) {
            sendMessage(inputText)
            setInputText('')
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') handleSendClick()
    }

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
                            variant="outlined"
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        color={isRecording ? 'secondary' : 'primary'}
                                        onClick={isRecording ? stopRecording : startRecording}
                                        edge="end"
                                    >
                                        <MicIcon />
                                    </IconButton>
                                ),
                            }}
                        />
                        <Button variant="contained" color="primary" onClick={handleSendClick} sx={{ height: 40 }}>
                            <Icon />
                        </Button>
                    </ControlsContainer>
                </ChatContainer>
            </Modal>
        </Stack>
    );
};

export default ChatBot