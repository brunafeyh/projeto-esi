import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/error'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import PedidosCliente from './pages/pedidos/cliente'
import RegisterPage from './pages/register'
import RestaurantMenu from './pages/restaurant-menu'
import Statistics from './pages/statistics'
import AdminOrders from './pages/pedidos/admin'
import Stock from './pages/estoque'

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
				path: 'menu',
				element: <RestaurantMenu />,
			},
			{
				path: 'my-orders',
				element: <PedidosCliente />,
			},
			{
				path: 'register',
				element: <RegisterPage />,
			},			
			{
				path: 'statistics',
				element: <Statistics />,
			},
			{
				path: 'stock',
				element: <Stock />,
			},
			{
				path: 'orders',
				element: <AdminOrders />,
			},
			{
				path: '*',
				element: <ErrorPage code={400} title="Ops! Página não encontrada" />,
			},
		],
	},
])
