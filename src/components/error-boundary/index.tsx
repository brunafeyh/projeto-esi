import React, { FC } from 'react'
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Box, Button, Typography } from '@mui/material'

const ErrorFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
	return (
		<Box role="alert" p={2} bgcolor="error.main" color="common.white" borderRadius={2}>
			<Typography variant="h6">Algo deu errado!</Typography>
			<Typography variant="body2" component="pre" color="inherit" style={{ whiteSpace: 'pre-wrap' }}>
				{error.message}
			</Typography>
			<Button variant="contained" color="secondary" onClick={resetErrorBoundary}>
				Por favor, tente novamente
			</Button>
		</Box>
	)
}

const ErrorBoundary: FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<ReactErrorBoundary
			FallbackComponent={ErrorFallback}
			onError={(error, info) => {
				console.error('Logging error:', error, info)
			}}
		>
			{children}
		</ReactErrorBoundary>
	)
}

export default ErrorBoundary
