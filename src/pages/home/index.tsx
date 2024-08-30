import React, { FC, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { PageLayout } from '../../layouts/page-layout';
import { useCart } from '../../hooks/use-cart';
import TabPanel from '../../components/tab';
import MoreSelled from '../../components/more-selled';
import AboutUs from '../../components/about-us';
import RecommendedDishes from '../../components/recomended-dishes';
import { useDishes } from '../../hooks/use-dishes';

const HomePage: FC = () => {
  const dishes = useDishes();
  const { addToCart } = useCart();
  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const recomended = dishes.slice(0, 3);

  return (
    <PageLayout title="HomePage">
      <Tabs
        value={tabIndex}
        onChange={handleChangeTab}
        aria-label="Menu Tabs"
      >
        <Tab label="Recomendações da Casa" />
        <Tab label="Os Mais Vendidos" />
        <Tab label="Sobre Nós" />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <RecommendedDishes pratos={recomended} onAddToCart={addToCart} />
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <MoreSelled dishes={dishes} onAddToCart={addToCart} />
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <AboutUs />
      </TabPanel>
    </PageLayout>
  );
};

export default HomePage;
