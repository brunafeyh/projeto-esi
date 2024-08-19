import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/error'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import Settings from './pages/settings'
import Cardapio from './pages/cardapio'
import Pontuacao from './pages/pontuacao'
import PedidosCliente from './pages/pedidos/cliente'

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
				path: 'pontuacao',
				element: <Pontuacao />,
			},
			{
				path: 'meus-pedidos',
				element: <PedidosCliente />,
			},
			{
				path: '*',
				element: <ErrorPage code={400} title="Ops! Página não encontrada" />,
			},
		],
	},
])
