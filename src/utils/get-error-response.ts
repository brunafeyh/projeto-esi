import { AxiosError } from 'axios'

interface ErrorResponse<T = any> {
	status: number
	message: string
	response: T | undefined
}

export const getErrorResponse = <T = any>(error: AxiosError): ErrorResponse<T> => {
	let status = 500
	let message = 'Unknown error'
	let response: T | undefined

	if (error.response) {
		status = error.response.status
		response = error.response.data as T

		if (response && typeof response === 'object' && 'message' in response && typeof response.message === 'string') {
			message = response.message
		}
	}

	return { status, message, response }
}
