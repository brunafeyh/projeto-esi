import { FC } from 'react';
import { PageLayout } from '../../layouts/page-layout';
import { TitlePage } from '../home/styles';
import { useFilteredPratos } from '../../hooks/use-filtered-pratos';
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
		adicionarAoCarrinho,
		filteredPratos
	} = useFilteredPratos();

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
			<PratoGrid pratos={filteredPratos} adicionarAoCarrinho={adicionarAoCarrinho} />
		</PageLayout>
	);
};

export default Cardapio;
