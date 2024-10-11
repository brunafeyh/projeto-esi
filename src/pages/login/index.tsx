import { FC } from 'react'
import { Stack } from '@mui/material'
import LoginHeader from '../../components/login-header'
import { AuthFormSection, ContainerInputLogin, TitleApresentation } from './style'
import LoginForm from '../../components/forms/login'
import ClearLogo from '../../components/logo/clear-logo'


const LoginPage: FC = () => {
	return (
		<Stack direction="row" width="100%" height="100vh" justifyContent="center">
			<LoginHeader />
			<AuthFormSection>
				<ContainerInputLogin>
					<ClearLogo />
					<TitleApresentation>Acessar conta</TitleApresentation>
					<LoginForm />
				</ContainerInputLogin>
			</AuthFormSection>
		</Stack>
	)
}

export default LoginPage
