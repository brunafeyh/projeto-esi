import { Stack, StackProps, styled } from "@mui/material";

export const ContainerPontuation = styled(Stack)<StackProps>(({ theme }) => ({
	minHeight: theme.spacing(6),
    minWidth: theme.spacing(30),
    padding: theme.spacing(2)
}))