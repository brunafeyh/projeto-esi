import { FC } from 'react'
import { PageLayout } from '../../layouts/page-layout'
import { SettingsSections } from '../../components/config-section/content'

const Settings: FC = () => {
  return (
    <PageLayout title="Settings">
      <SettingsSections />
    </PageLayout>
  )
}

export default Settings
