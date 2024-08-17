import { atomWithStorage } from 'jotai/utils'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../utils/constants/values'

export const accessTokenAtom = atomWithStorage<string | null>(
	ACCESS_TOKEN_KEY,
	localStorage.getItem(ACCESS_TOKEN_KEY) ?? null
)

export const refreshTokenAtom = atomWithStorage<string>(
	REFRESH_TOKEN_KEY,
	localStorage.getItem(REFRESH_TOKEN_KEY) ?? ''
)
