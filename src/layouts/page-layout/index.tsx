import { FC, PropsWithChildren } from 'react'
import ViewContainer from '../view-container'
import { Stack } from './styles'
import { useSetTitle } from '../../hooks/use-set-title'
import Menu from '../../components/menu'
import Sidebar from '../../components/sidebar'

interface Props {
	title: string
	children: React.ReactNode
}

export const PageLayout: FC<PropsWithChildren<Props>> = ({ title, children }) => {
	useSetTitle(title)
	return (
		<Stack minHeight="100vh" justifyContent="space-between" >
			<Menu />
			<Sidebar />
			<ViewContainer>{children}</ViewContainer>
		</Stack>
	)
}
