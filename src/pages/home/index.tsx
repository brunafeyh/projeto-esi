import { PageLayout } from '../../layouts/page-layout'
import { TitlePage } from './styles'
import { FC } from 'react'

const HomePage: FC = () => {
	return (
		<PageLayout title="HomePage">
			<TitlePage>Os mais vendidos</TitlePage>

			<TitlePage>Recomendação da cozinha</TitlePage>
		</PageLayout>
	)
}

export default HomePage
