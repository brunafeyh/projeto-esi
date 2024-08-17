import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Alert, Button, Snackbar, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ContainerTitles } from './styles'
import { AuthorizationRole } from '../../types/keycloak'
import { Modal, useModal } from '../../components/modal'
import ErrorPage from '../../pages/error'
import { theme } from '../../themes'
import { useAuth } from '../../hooks/use-auth'

export const withAuthentication = <P extends object>(
	Component: FunctionComponent<P>,
	roles: AuthorizationRole[]
): React.FC<P> => {
	const WrappedComponent: React.FC<P> = (props) => {
		const { hasSomeRole, isTokenAboutToExpire, renewToken, logout, isRefreshTokenExpired } = useAuth()
		const navigate = useNavigate()
		const [showExpirationWarning, setShowExpirationWarning] = useState(false)
		const modalRef = useModal()
		const hasRequiredRoles = hasSomeRole(roles)
		const timeoutRef = useRef<NodeJS.Timeout>()
		const autoLogoutTimeoutRef = useRef<NodeJS.Timeout>()

		useEffect(() => {
			const checkTokenExpiration = async () => {
				if (isRefreshTokenExpired()) {
					clearTimeout(timeoutRef.current!)
					clearTimeout(autoLogoutTimeoutRef.current!)
					await logout()
					navigate('/login')
					return
				}

				if (isTokenAboutToExpire() && !showExpirationWarning) {
					setShowExpirationWarning(true)
					modalRef.current?.openModal()
					autoLogoutTimeoutRef.current = setTimeout(async () => {
						if (isRefreshTokenExpired()) {
							clearTimeout(timeoutRef.current!)
							await logout()
							navigate('/login')
						}
					}, 31_000)
				}
			}

			const intervalId = setInterval(checkTokenExpiration, 30_000)
			checkTokenExpiration()

			return () => {
				clearInterval(intervalId)
				clearTimeout(timeoutRef.current!)
				clearTimeout(autoLogoutTimeoutRef.current!)
			}
		}, [isTokenAboutToExpire, logout, navigate, renewToken, showExpirationWarning])

		const handleRenewToken = async () => {
			await renewToken()
			setShowExpirationWarning(false)
			clearTimeout(timeoutRef.current!)
			clearTimeout(autoLogoutTimeoutRef.current!)
			modalRef.current?.closeModal()
		}

		const handleLogout = async () => {
			modalRef.current?.closeModal()
			clearTimeout(timeoutRef.current!)
			clearTimeout(autoLogoutTimeoutRef.current!)
			await logout()
			navigate('/login')
		}

		if (!hasRequiredRoles) {
			return <ErrorPage code={401} title="Ops! Você não possui autorização para navegar nessa página" />
		}

		return (
			<>
				{showExpirationWarning && (
					<Snackbar open autoHideDuration={5000}>
						<Alert severity="warning" sx={{ width: '100%' }}>
							Seu token expirou, você será redirecionado para a página de login em 30 segundos se não
							fizer a renovação da sessão!
						</Alert>
					</Snackbar>
				)}

				<Modal ref={modalRef}>
					<Stack
						minWidth={theme.spacing(20)}
						borderRadius="4px"
						bgcolor="background.paper"
						p={4}
						minHeight={theme.spacing(20)}
						spacing={4}
					>
						<ContainerTitles>
							<Typography>Infelizmente, seu token de acesso expirou!</Typography>
							<Typography>Gostaria de renová-lo?</Typography>
						</ContainerTitles>
						<Stack pt={1} spacing={3} direction="row" justifyContent="center">
							<Button size="small" variant="contained" onClick={handleLogout}>
								Cancelar
							</Button>
							<Button size="small" variant="contained" onClick={handleRenewToken} autoFocus>
								Renovar
							</Button>
						</Stack>
					</Stack>
				</Modal>

				{!isTokenAboutToExpire() && <Component {...props} />}
			</>
		)
	}

	WrappedComponent.displayName = `WithAuthentication(${Component.displayName || Component.name})`

	return WrappedComponent
}
