import React from 'react'

import Grid, { GridProps } from '@mui/material/Grid'

interface Props extends GridProps {
	children: React.ReactNode
}

const NotFoundContainer: React.FC<Props> = ({ children, ...attrs }) => {
	return (
		<Grid
			container
			justifyContent="center"
			alignItems="center"
			columnSpacing={4}
			rowGap={2}
			px={{ xl: 10, lg: 10, md: 10, sm: 8, xs: 4 }}
			paddingTop={30}
			paddingBottom={8}
			component="main"
			columns={{ xl: 12, lg: 12, md: 8, sm: 4, xs: 4 }}
			{...attrs}
		>
			{children}
		</Grid>
	)
}

export default NotFoundContainer
