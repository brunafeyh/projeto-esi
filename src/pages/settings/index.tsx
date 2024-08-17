import { FC } from 'react'
import { TitlePageSettings } from './styles'
import { PageLayout } from '../../layouts/page-layout'

const Settings: FC = () => {
	return (
		<PageLayout title="Settings">
			<TitlePageSettings>Configurações</TitlePageSettings>
		</PageLayout>
	)
}

export default Settings
