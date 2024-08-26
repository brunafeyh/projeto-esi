import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/error'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import Settings from './pages/settings'
import PedidosCliente from './pages/pedidos/cliente'
import PedidosAdmin from './pages/pedidos/admin'
import Cardapio from './pages/cardapio'

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
				path: 'cardapio',
				element: <Cardapio />,
			},
			{
				path: 'settings',
				element: <Settings />,
			},
			{
				path: 'meus-pedidos',
				element: <PedidosCliente />,
			},
			{
				path: 'pedidos',
				element: <PedidosAdmin />,
			},
			{
				path: '*',
				element: <ErrorPage code={400} title="Ops! Página não encontrada" />,
			},
		],
	},
])
