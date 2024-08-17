import { AxiosInstance, AxiosRequestHeaders } from 'axios'

interface SetAuthorizationHeaderParams {
	instance: AxiosInstance
	token: string
}

export const setAuthorizationHeader = ({ instance, token }: SetAuthorizationHeaderParams) => {
	instance.interceptors.request.use(
		(config) => {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`,
			} as AxiosRequestHeaders

			return config
		},
		(error) => Promise.reject(error)
	)
}
