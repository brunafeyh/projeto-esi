import { FONT_WEIGHTS } from '../../themes/fonts'
import { PresentationContainer } from './styles'
import { Typography } from '@mui/material'
import { theme } from '../../themes'

const LoginHeader = () => {
	return (
		<PresentationContainer style={{ position: 'relative', display: 'inline-block' }}>
			<Typography
				variant="h4"
				style={{
					fontWeight: FONT_WEIGHTS.extralight, 
					fontSize: theme.spacing(3),
					position: 'absolute',
					top: '45%', 
					left: '25%',
					color: 'white',
				}}
			>
				Receba carinho em forma de sabor!
			</Typography>
			<Typography
				variant="h4"
				style={{
					fontWeight: FONT_WEIGHTS.regular, 
					fontSize: theme.spacing(2),
					position: 'absolute',
					top: '52%', 
					left: '25%',
					color: 'white',
				}}
			> ~ Restaurante carinho
			</Typography>
			<img
				src="/images/imagem-login.png"
				alt="Imagem de prato"
				style={{ width: '740px', height: '738px' }}
			/>
		</PresentationContainer>
	)
}

export default LoginHeader
