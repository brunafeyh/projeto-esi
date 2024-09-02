import { FC } from 'react';
import { PageLayout } from '../../layouts/page-layout';
import { TitlePage } from '../home/styles';
import { useFilteredDishes } from '../../hooks/use-filtered-dishes';
import CardapioFilter from '../../components/cardapio-filter';
import EditDisheGrid from '../../components/dishe-grid/edit-dishe-grid';
import { useAuth } from '../../hooks/use-auth';
import DisheGrid from '../../components/dishe-grid';

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

	const { user } = useAuth()

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
			{user?.role === "ROLE_ADMINISTRATOR" || user?.role === "ROLE_ATTENDANT" ? (
				<EditDisheGrid dishes={filteredDishes}/>
			) :
				<DisheGrid dishes={filteredDishes} addToCart={addToCart} />
			}
		</PageLayout>
	);
};

export default Cardapio;
