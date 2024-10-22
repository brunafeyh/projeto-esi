import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/error'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import RestaurantMenu from './pages/restaurant-menu'
import Statistics from './pages/statistics'
import Stock from './pages/stock'
import AdminOrders from './pages/orders/admin'
import ClientOrders from './pages/orders/client'
import CategoriesPage from './components/settings/categorys'
import Settings from './pages/settings'

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
				element: <ClientOrders />,
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
				path: 'settings',
				element: <Settings />,
			},
			{
				path: 'categorys',
				element: <CategoriesPage />,
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
