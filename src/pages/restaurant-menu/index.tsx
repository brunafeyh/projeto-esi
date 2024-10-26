import { FC } from 'react'
import { PageLayout } from '../../layouts/page-layout'
import { TitlePage } from '../home/styles'
import DishesMenu from '../../components/menu-dishes'

const RestaurantMenu: FC = () => {
  return (
    <PageLayout title="Cardápio">
      <TitlePage>Cardápio</TitlePage>
      <DishesMenu />
    </PageLayout>
  )
}

export default RestaurantMenu