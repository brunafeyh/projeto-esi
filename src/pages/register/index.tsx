import { FC } from 'react'
import { Stack } from '@mui/material'
import { AuthFormSection, ContainerInputLogin, TitleApresentation } from '../login/style'
import LogoClara from '../../components/logo/logo-clara'
import RegisterForm from '../../components/forms/register'


const RegisterPage: FC = () => {
	return (
		<Stack direction="row" width="100%" height="100vh" justifyContent="center">
			<AuthFormSection>
				<ContainerInputLogin>
					<LogoClara />
					<TitleApresentation>Faça o seu cadastro</TitleApresentation>
					<RegisterForm />
				</ContainerInputLogin>
			</AuthFormSection>
		</Stack>
	)
}

export default RegisterPage
