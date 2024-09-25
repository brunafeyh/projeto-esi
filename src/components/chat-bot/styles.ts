import { Box, BoxProps, Button as ButtonMui, ButtonProps, styled, TextField as TextFieldMui, TextFieldProps } from "@mui/material";
import { FONT_WEIGHTS } from "../../themes/fonts";
import  SendIcon from '@mui/icons-material/Send';

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


export const ChatContainer = styled(Box)<BoxProps>(({ theme }) => ({
    width: theme.spacing(50),
    margin: '0 auto',
    padding: theme.spacing(2.5),
    border: `1 px solid ${theme.palette.unioeste.neutral.p20}`,
    borderRadius: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.unioeste.neutral.p10,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
}));

export const MessagesContainer = styled(Box)<BoxProps>(({ theme }) => ({
    flex: 1,
    marginBottom: theme.spacing(1.25),
    overflowY: 'auto',
    maxHeight: theme.spacing(37.5),
    padding: theme.spacing(1.25),
}));

export const ControlsContainer = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1.25),
    marginTop: theme.spacing(1.25),
    alignItems: 'center',
    padding: theme.spacing(1.25),
}));

export const Icon = styled(SendIcon)(({ theme }) => ({
    width: theme.spacing(1),
    height: theme.spacing(1)
}));

export const TextField = styled(TextFieldMui)<TextFieldProps>(({ theme }) => ({
    backgroundColor: theme.palette.unioeste.neutral.p10,
    borderRadius: theme.spacing(0.5),
}));

export const Button = styled(ButtonMui)<ButtonProps>(({ theme }) => ({
    textTransform: 'none',
    minWidth: theme.spacing(10),
    padding: '6px 12px',
    boxShadow: 'none',
    color: theme.palette.unioeste.neutral.p100,
    fontWeight: FONT_WEIGHTS.bold,
    backgroundColor: theme.palette.unioeste.neutral.p20,
    '&:hover': {
        backgroundColor: theme.palette.unioeste.neutral.p20,
    },
}));