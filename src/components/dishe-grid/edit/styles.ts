import { styled, Box as BoxMui, BoxProps } from "@mui/material";

export const EditBox = styled(BoxMui)<BoxProps>(({theme}) => ({
    backgroundColor: theme.palette.unioeste.neutral.p10,
    padding: theme.spacing(2),
    width: theme.spacing(50)
}))

export const ConfirmBox = styled(BoxMui)<BoxProps>(({theme}) => ({
    display: 'flex',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
    justifyItems: 'center',
    justifyContent: 'center'
}))