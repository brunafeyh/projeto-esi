import { FC } from 'react';
import { PageLayout } from '../../layouts/page-layout';
import { TitlePage } from '../home/styles';
import { useFilteredDishes } from '../../hooks/use-filtered-dishes';
import CardapioFilter from '../../components/cardapio-filter';
import PratoGrid from '../../components/dishe-grid';

const Cardapio: FC = () => {
	const {
		searchTerm,
		sortOrder,
		selectedCategory,
		setSearchTerm,
		setSortOrder,
		setSelectedCategory,
		addToCart,
		filteredDishes
	} = useFilteredDishes();

	return (
		<PageLayout title="Cardápio">
			<TitlePage>Cardápio</TitlePage>
			<CardapioFilter
				searchTerm={searchTerm} 
				setSearchTerm={setSearchTerm} 
				selectedCategory={selectedCategory} 
				setSelectedCategory={setSelectedCategory} 
				sortOrder={sortOrder} 
				setSortOrder={setSortOrder} 
			/>
			<PratoGrid dishes={filteredDishes} addToCart={addToCart} />
		</PageLayout>
	);
};

export default Cardapio;
