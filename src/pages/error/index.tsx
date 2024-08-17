import React from 'react'
import { Stack, Typography } from '@mui/material'
import GoBack from './go-back'
import NotFoundContainer from '../../layouts/not-found-container'

interface Props {
	code: number
	title: string
}

const ErrorPage: React.FC<Props> = ({ code, title }) => {
	return (
		<NotFoundContainer>
			<Stack justifyContent="center" alignItems="center" height="100%" spacing={4}>
				<Typography variant="h1" color="pti.neutral.p100" fontSize={(theme) => theme.spacing(10)}>
					{code}
				</Typography>
				<Typography variant="h2" color="pti.neutral.p100" fontSize={(theme) => theme.spacing(4)}>
					{title}
				</Typography>
				<GoBack />
			</Stack>
		</NotFoundContainer>
	)
}

export default ErrorPage
