import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import LoginIcon from '@mui/icons-material/Login'
import { useNavigate } from 'react-router-dom'

import { IconBottonStyled, styles } from './styles'

const GoBack = () => {
	const navigate = useNavigate()

	const navegateTo = () => {
		navigate('/')
	}

	const navegateToLogin = () => {
		navigate('/login')
	}
	return (
		<>
			<IconBottonStyled onClick={navegateTo}>
				<ArrowBackOutlinedIcon style={styles.arrowIcon} />
				Voltar ao início
			</IconBottonStyled>
			<IconBottonStyled onClick={navegateToLogin}>
				<LoginIcon style={styles.arrowIcon} />
				Voltar à página de login
			</IconBottonStyled>
		</>
	)
}

export default GoBack
