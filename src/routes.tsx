import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/error'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import Settings from './pages/settings'
import Pedido from './pages/pedidos'

export const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'settings',
				element: <Settings />,
			},
			{
				path: 'pedidos',
				element: <Pedido />,
			},
			{
				path: '*',
				element: <ErrorPage code={400} title="Ops! Página não encontrada" />,
			},
		],
	},
])
