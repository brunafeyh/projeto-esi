import { FC } from 'react'
import { Stack } from '@mui/material'
import { AuthFormSection, ContainerInputLogin, TitleApresentation } from '../login/style'
import ClearLogo from '../../components/logo/clear-logo'
import RegisterForm from '../../components/forms/register'

const RegisterPage: FC = () => {
	return (
		<Stack direction="row" width="100%" height="100vh" justifyContent="center">
			<AuthFormSection>
				<ContainerInputLogin>
					<ClearLogo />
					<TitleApresentation>Faça o seu cadastro</TitleApresentation>
					<RegisterForm />
				</ContainerInputLogin>
			</AuthFormSection>
		</Stack>
	)
}

export default RegisterPage
