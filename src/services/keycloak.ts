import { AxiosError } from 'axios'
import { OpenID } from '../types/keycloak'
import keycloakAPI from '../shared/keycloak'
import { AuthCredentials } from '../schemas/form-types'


export class KeycloakService {
	private realm: string
	private clientID: string
	private clientSecret: string

	constructor() {
		this.realm = import.meta.env.VITE_KEYCLOAK_REALM
		this.clientID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID
		this.clientSecret = import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET
	}

	private async getAccessToken(params: URLSearchParams): Promise<OpenID> {
		try {
			const response = await keycloakAPI.post<OpenID>(
				`realms/${this.realm}/protocol/openid-connect/token`,
				params,
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			)
			return response.data
		} catch (error: unknown) {
			if (error instanceof AxiosError && error.response?.data) {
				throw new Error(`Falha ao obter token de acesso: ${error.response.data.error_description}`)
			} else if (error instanceof Error) {
				throw new TypeError(`Falha ao obter token de acesso: ${error.message}`)
			} else {
				throw new TypeError('Falha ao obter token de acesso: erro desconhecido')
			}
		}
	}
	async login(credentials: AuthCredentials): Promise<OpenID> {
		const params = new URLSearchParams({
			client_id: this.clientID,
			grant_type: 'password',
			client_secret: this.clientSecret,
			username: credentials.username,
			password: credentials.password,
		})

		return this.getAccessToken(params)
	}
	async logout(refreshToken: string): Promise<void> {
		const params = new URLSearchParams({
			client_id: this.clientID,
			client_secret: this.clientSecret,
			refresh_token: refreshToken,
		})

		try {
			await keycloakAPI.post(`realms/${this.realm}/protocol/openid-connect/logout`, params, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			})
		} catch (error: unknown) {
			if (error instanceof AxiosError && error.response?.data) {
				throw new Error(`Falha ao fazer logout: ${error.response.data.error_description}`)
			} else if (error instanceof Error) {
				throw new TypeError(`Falha ao fazer logout: ${error.message}`)
			} else {
				throw new TypeError('Falha ao fazer logout: erro desconhecido')
			}
		}
	}

	async refreshAccessToken(refreshToken: string): Promise<OpenID> {
		const params = new URLSearchParams({
			client_id: this.clientID,
			grant_type: 'refresh_token',
			client_secret: this.clientSecret,
			refresh_token: refreshToken,
		})

		return this.getAccessToken(params)
	}
}
