export type AuthorizationRole = 'ADMIN' | 'EDITOR' | 'VIEWER'

export interface OpenID {
	access_token: string
	refresh_token: string
	expires_in: number
	token_type: string
}

export interface User {
	name: string
	email: string
	role: AuthorizationRole
}

export interface AccessToken {
	exp: number
	typ: string
	name: string
	email: string
	realm_access: {
		roles: AuthorizationRole[]
	}
}

export interface RefreshToken {
	exp: number
	typ: string
	name: string
	email: string
	realm_access: {
		roles: AuthorizationRole[]
	}
}

export interface Feedback {
	status: 'error' | 'success' | 'warning'
	message: string
}
