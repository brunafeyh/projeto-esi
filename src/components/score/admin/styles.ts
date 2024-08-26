import { Stack, StackProps, styled } from "@mui/material";

export const ContainerPontuation = styled(Stack)<StackProps>(({ theme }) => ({
	minHeight: theme.spacing(10),
    minWidth: theme.spacing(60),
    padding: theme.spacing(2)
}))