import { FC } from 'react'
import { PageLayout } from '../../layouts/page-layout'
import { HomeSections } from '../../components/sections/home'

const HomePage: FC = () => {
  return (
    <PageLayout title="HomePage">
      <HomeSections />
    </PageLayout>
  )
}

export default HomePage
