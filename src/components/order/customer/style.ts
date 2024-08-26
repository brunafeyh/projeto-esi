import { Button as ButtonMui, ButtonProps, styled } from "@mui/material";

export const Button = styled(ButtonMui)<ButtonProps>(({ theme }) => ({
	backgroundColor: theme.palette.unioeste.error.p50,
    '&:hover': {
        backgroundColor: theme.palette.error.light,
    },
}))