import { Stack, StackProps, styled } from '@mui/material'

export const ContainerTitles = styled(Stack)<StackProps>(({ theme }) => ({
	alignItems: 'center',
	gap: theme.spacing(1),
	justifyContent: 'center',
}))
