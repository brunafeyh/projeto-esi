import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputAdornment, Stack, Tooltip, Typography, Link as MuiLink } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ButtonLoginForm, IconButtonLoginForm, LoginFormContainer, TextField, TitleRegister } from './styles'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useAuth } from '../../../hooks/use-auth'
import { AuthCredentials, credentialsSchema } from '../../../schemas/form-types'

const LoginForm: React.FC = () => {
	const { login } = useAuth()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthCredentials>({
		resolver: zodResolver(credentialsSchema),
	})

	const [loginError, setLoginError] = useState<string | null>(null)
	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const navigate = useNavigate()

	const onSubmit = async (data: AuthCredentials) => {
		try {
			const response = await login(data)
			if (response) {
				setLoginError(null)
				navigate('/')
				window.location.reload()
			} else {
				setLoginError('Usuário ou senha inválidos')
			}
		} catch (error) {
			console.error('Erro no servidor:', error)
			setLoginError('Erro no servidor. Tente novamente mais tarde.')
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{loginError && (
				<Typography color="error" sx={{ fontSize: '1rem', marginTop: '1rem' }}>
					{loginError}
				</Typography>
			)}
			<LoginFormContainer>
				<TextField
					{...register('email', { required: 'Usuário é obrigatório' })}
					id="filled-basic"
					label="Usuário"
					variant="filled"
					error={!!errors.email}
					helperText={errors.email?.message}
				/>
				<TextField
					{...register('password', { required: 'Senha é obrigatória' })}
					id="password"
					label="Senha"
					variant="filled"
					type={showPassword ? 'text' : 'password'}
					error={!!errors.password}
					helperText={errors.password?.message}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Tooltip title={showPassword ? 'Ocultar senha' : 'Mostrar senha'} placement="top">
									<IconButtonLoginForm
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButtonLoginForm>
								</Tooltip>
							</InputAdornment>
						),
					}}
				/>
			</LoginFormContainer>
			<Stack spacing={2}>
				<ButtonLoginForm type="submit" variant="contained">
					Entrar
				</ButtonLoginForm>
				<TitleRegister>
					Não tem conta?{' '}
					<MuiLink href="/register" sx={{ fontSize: '0.75rem' }} color="primary">
						Faça o seu cadastro
					</MuiLink>
				</TitleRegister>
			</Stack>
		</form>
	)
}

export default LoginForm
