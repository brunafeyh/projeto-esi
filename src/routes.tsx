import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/error'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import PedidosCliente from './pages/pedidos/cliente'
import PedidosAdmin from './pages/pedidos/admin'
import Cardapio from './pages/cardapio'
import Estatisticas from './pages/estatisticas'
import Estoque from './pages/estoque'
import RegisterPage from './pages/register'

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
				path: 'meus-pedidos',
				element: <PedidosCliente />,
			},
			{
				path: 'register',
				element: <RegisterPage />,
			},			
			{
				path: 'estatisticas',
				element: <Estatisticas />,
			},
			{
				path: 'estoque',
				element: <Estoque />,
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
