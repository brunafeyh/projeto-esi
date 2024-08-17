import { PageLayout } from '../../layouts/page-layout'
import { TitlePage } from './styles'
import { FC } from 'react'

const HomePage: FC = () => {
	return (
		<PageLayout title="Cardápio">
			<TitlePage>Cardápio</TitlePage>
		</PageLayout>
	)
}

export default HomePage
