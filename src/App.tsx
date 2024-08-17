import React, { Suspense } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import Loading from './components/loading'
import { queryClient } from './shared/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import ErrorBoundary from './components/error-boundary'
import { theme } from './themes'

const App: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<ErrorBoundary>
					<Suspense fallback={<Loading />}>
						<ToastContainer />
						<RouterProvider router={router} />
					</Suspense>
				</ErrorBoundary>
			</ThemeProvider>
		</QueryClientProvider>
	)
}

export default App
