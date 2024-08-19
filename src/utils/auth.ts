import { jwtDecode } from 'jwt-decode'
import { AccessToken, AuthorizationRole, User } from '../types/auth'


interface DecodedToken {
	exp: number
}
export const decodeToken = (token: string) => jwtDecode<AccessToken>(token)

export const getUserFromToken = (token?: string | null): User | null => {
	if (!token) return null

	const decodedToken = decodeToken(token)
	console.log(decodeToken)

	const user: User = {
		name: decodedToken.name ?? 'Unknown', 
		email: decodedToken.email ?? 'Unknown',
		role: getBiggerRole(decodedToken.roles ?? [])
	}

	return user
}

export const getExpirationTime = (token: string | null): number => {
	if (!token) {
		return 0
	}
	const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token)
	return decodedToken.exp * 1000
}

export const getBiggerRole = (roles: AuthorizationRole[] | string[]): AuthorizationRole => {
	if (roles.includes('ADMIN')) return 'ADMIN'
	if (roles.includes('EDITOR')) return 'EDITOR'
	return 'VIEWER'
}
