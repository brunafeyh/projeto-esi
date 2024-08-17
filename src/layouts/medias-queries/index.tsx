import React, { ReactNode } from 'react'

import { Theme, useMediaQuery, useTheme } from '@mui/material'

interface MediaQueryProps {
	query: string | ((theme: Theme) => string)
	children: ReactNode
}

const MediaQuery: React.FC<MediaQueryProps> = ({ query, children }) => {
	const theme = useTheme()
	const matches = useMediaQuery(typeof query === 'string' ? query : query(theme))

	if (!matches) {
		return null
	}

	return children
}

export default MediaQuery
