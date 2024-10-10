import { styled, IconButton as IconButtonMui, IconButtonProps} from "@mui/material";

export const IconButton = styled(IconButtonMui)<IconButtonProps>(({ theme }) => ({
    height: theme.spacing(2),
    width: theme.spacing(2)
}))
