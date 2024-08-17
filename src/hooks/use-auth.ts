import { useCallback, useMemo } from 'react'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { RESET } from 'jotai/utils'
import { KeycloakService } from '../services/keycloak'
import { accessTokenAtom, refreshTokenAtom } from '../contexts/auth'
import { getExpirationTime, getUserFromToken } from '../utils/auth'
import { AuthCredentials } from '../schemas/form-types'
import { setAuthorizationHeader } from '../services/auth'
import bpAPI from '../shared/api'
import { AuthorizationRole } from '../types/keycloak'

const keycloakService = new KeycloakService()

export const useAuth = () => {
	const [accessToken, setAccessToken] = useAtom(accessTokenAtom)
	const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom)
	const expirationTime = getExpirationTime(accessToken)
	const refreshExpirationTime = getExpirationTime(refreshToken)
	const navigate = useNavigate()

	const user = useMemo(() => getUserFromToken(accessToken), [accessToken])

	const updateTokens = (accessToken: string, refreshToken: string) => {
		setAccessToken(accessToken)
		setRefreshToken(refreshToken)
	}

	const login = useCallback(async (credentials: AuthCredentials) => {
		try {
			const { access_token, refresh_token } = await keycloakService.login(credentials)
			setAccessToken(access_token)
			setRefreshToken(refresh_token)
			setAuthorizationHeader({ instance: bpAPI, token: access_token })

			return true
		} catch (error) {
			console.error('Erro ao fazer login:', error)
			return false
		}
	}, [])

	const logout = useCallback(async () => {
		if (!refreshToken) return

		try {
			await keycloakService.logout(refreshToken)
		} catch (error) {
			console.error('Erro ao fazer logout no Keycloak:', error)
		} finally {
			setAccessToken(RESET)
			setRefreshToken(RESET)
		}
	}, [refreshToken, setAccessToken, setRefreshToken])

	const renewToken = useCallback(async () => {
		if (isRefreshTokenExpired() || !refreshToken) return

		try {
			const newTokens = await keycloakService.refreshAccessToken(refreshToken)
			updateTokens(newTokens.access_token, newTokens.refresh_token)
		} catch (error) {
			console.error('Erro ao renovar token:', error)
			logout()
			navigate('/login')
		}
	}, [refreshToken, updateTokens, logout, navigate])

	const hasSomeRole = useCallback(
		(requiredRoles: AuthorizationRole[]) => {
			return user ? requiredRoles.includes(user.role) : false
		},
		[user]
	)

	const isAuthenticated = useCallback(() => {
		return accessToken && refreshToken && !isAccessTokenExpired() && !isRefreshTokenExpired()
	}, [accessToken, refreshToken])

	const isAccessTokenExpired = useCallback(() => {
		return Date.now() > expirationTime
	}, [expirationTime])

	const isRefreshTokenExpired = useCallback(() => {
		return Date.now() > refreshExpirationTime
	}, [refreshExpirationTime])

	const isTokenAboutToExpire = useCallback(() => {
		const currentTime = Date.now()
		return (
			(!isAccessTokenExpired() && currentTime > expirationTime - 30000) ||
			(!isRefreshTokenExpired() && currentTime > refreshExpirationTime - 30000)
		)
	}, [expirationTime, refreshExpirationTime, isAccessTokenExpired, isRefreshTokenExpired])

	return {
		token: accessToken,
		accessToken,
		refreshToken,
		user,
		login,
		logout,
		isAuthenticated,
		isRefreshTokenExpired,
		isTokenAboutToExpire,
		hasSomeRole,
		renewToken,
	}
}
