import { Stack, StackProps, styled } from '@mui/material'

export const PopoverContainer = styled(Stack)<StackProps>(({ theme }) => ({
	minWidth: theme.spacing(19.5),
	minHeight: theme.spacing(17),
	borderRadius: theme.spacing(0),
}))
