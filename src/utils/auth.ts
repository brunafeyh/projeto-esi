import { jwtDecode } from 'jwt-decode'
import { AccessToken, AuthorizationRole, User } from '../types/auth'
import { useAuth } from '../hooks/use-auth'

interface DecodedToken {
	exp: number
}

export const decodeToken = (token: string) => jwtDecode<AccessToken>(token)

export const getUserFromToken = (token?: string | null): User | null => {
	if (!token) return null

	const decodedToken = decodeToken(token)

	const user: User = {
		cpf: decodedToken.cpf ? decodedToken.cpf : 'Unknown',
		email: decodedToken.email ?? 'Unknown',
		name: decodedToken.name ?? 'Unknown',
		role: decodedToken.role
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

export const roles: AuthorizationRole[] = ['ROLE_ADMINISTRATOR', 'ROLE_ATTENDANT', 'ROLE_CUSTOMER'];

export function getCpf(): string {
	const { user } = useAuth();
	if (user && user.cpf) {
		return user.cpf
	}
	return ''
}