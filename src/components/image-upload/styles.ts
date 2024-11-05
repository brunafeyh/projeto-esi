import { Box, styled } from "@mui/material";

export const DropZone = styled(Box)(({ theme }) => ({
    border: '2px dashed #ccc',
    borderRadius: '4px',
    padding: theme.spacing(4),
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#ebebeb',
    },
}));