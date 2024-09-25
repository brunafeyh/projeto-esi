import { Box, Button, styled, TextField } from "@mui/material";

export const MessageBox = styled(Box)<{ align: 'left' | 'right'; bgcolor: string }>(
    ({ align, bgcolor }) => ({
        alignSelf: align === 'right' ? 'flex-end' : 'flex-start',
        backgroundColor: bgcolor,
        padding: '10px 15px',
        borderRadius: '8px',
        margin: '5px 0',
        maxWidth: '80%',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
    })
);

export const ChatContainer = styled(Box)({
    width: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
});

export const MessagesContainer = styled(Box)({
    flex: 1,
    marginBottom: '10px',
    overflowY: 'auto',
    maxHeight: '300px',
    padding: '10px',
});

export const ControlsContainer = styled(Box)({
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
    alignItems: 'center',
    padding: '10px',
});
export const StyledTextField = styled(TextField)({
    backgroundColor: '#fff',
    borderRadius: '4px',
});

export const StyledButton = styled(Button)({
    textTransform: 'none',
    minWidth: '80px',
    padding: '6px 12px',
    boxShadow: 'none', 
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: '#ededed'
});