import { Stack as StackMui, StackProps, styled, Typography, TypographyProps, Button as ButtonMui } from "@mui/material";

export const Stack = styled(StackMui)<StackProps>(({ theme }) => ({
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    spacing: theme.spacing(4),
}));

export const ErrorCode = styled(Typography)<TypographyProps>(({ theme }) => ({
    fontSize: theme.spacing(10),
    color: theme.palette.text.primary,
}));

export const ErrorTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
    fontSize: theme.spacing(4),
    color: theme.palette.text.secondary,
    textAlign: 'center',
}));

export const Button = styled(ButtonMui)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
    borderRadius: '9999px',
    textTransform: 'none',
    fontSize: '1rem',
}));