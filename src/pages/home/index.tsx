import { PageLayout } from '../../layouts/page-layout'
import { TitlePage } from './styles'
import { FC } from 'react'

const HomePage: FC = () => {
	return (
		<PageLayout title="HomePage">
			<TitlePage>HomePage</TitlePage>
		</PageLayout>
	)
}

export default HomePage
