import { jwtDecode } from 'jwt-decode'
import { AccessToken, AuthorizationRole, User } from '../types/auth'


interface DecodedToken {
	exp: number
}
export const decodeToken = (token: string) => jwtDecode<AccessToken>(token)

export const getUserFromToken = (token?: string | null): User | null => {
	if (!token) return null
	console.log(token)

	const decodedToken = decodeToken(token)

	console.log(decodedToken)

	const user: User = {
		cpf: decodedToken.cpf ? decodedToken.cpf : 'Unknown', 
		email: decodedToken.email ?? 'Unknown',
		name: decodedToken.name ?? 'Unknown',
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
	if (roles.includes('ADMINISTRATOR')) return 'ADMINISTRATOR'
	if (roles.includes('CUSTUMER')) return 'CUSTUMER'
	return 'ATTENDANT'
}

export const roles: AuthorizationRole[] = ['ADMINISTRATOR', 'ATTENDANT']; 