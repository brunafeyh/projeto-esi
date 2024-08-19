import { styled } from '@mui/material'
import Stack, { StackProps } from '@mui/material/Stack'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { FONT_WEIGHTS } from '../../themes/fonts'

export const AuthFormSection = styled(Stack)<StackProps>(() => ({
	width: '51.92vw',
	height: '100vh',
	justifyContent: 'center',
	alignItems: 'center',
}))

export const TitleApresentation = styled(Typography)<TypographyProps>(({ theme }) => ({
	fontFamily: 'IBM Plex Sans',
	fontSize: theme.spacing(2),
	fontWeight: FONT_WEIGHTS.regular,
	color: theme.palette.unioeste.neutral.p100,
}))

export const ContainerInputLogin = styled(Stack)<StackProps>(({ theme }) => ({
	width: theme.spacing(49),
	height: theme.spacing(28),
	justifyContent: 'center',
	
	marginLeft: theme.spacing(16),
	marginRight: theme.spacing(16),
}))
export const TitleVersion = styled(Typography)<TypographyProps>(({ theme }) => ({
	width: theme.spacing(10),
	height: theme.spacing(2),
	textAlign: 'center',
	fontSize: theme.spacing(1.75),
	fontWeight: FONT_WEIGHTS.regular,
	color: theme.palette.unioeste.neutral.p100,
	marginBottom: theme.spacing(3),
}))
