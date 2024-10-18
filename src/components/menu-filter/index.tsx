import { FC } from 'react';
import { Stack, MenuItem, InputAdornment, CircularProgress } from '@mui/material';
import { IconSearch, Select, TextField, FormControl, InputLabel } from './styles';
import { useCategories } from '../../hooks/category/use-categorys';

interface CardapioFilterProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	selectedCategory: string;
	setSelectedCategory: (category: string) => void;
	sortOrder: 'asc' | 'desc';
	setSortOrder: (order: 'asc' | 'desc') => void;
}

const MenuFilter: FC<CardapioFilterProps> = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, sortOrder, setSortOrder }) => {
	const { categories, isLoading, error } = useCategories();

	const categoryItems: JSX.Element[] = [];
	if (!isLoading && !error) {
		categories.forEach((category) => {
			categoryItems.push(
				<MenuItem key={category.id} value={category.id}>
					{category.name}
				</MenuItem>
			);
		});
	}

	return (
		<Stack direction="row" spacing={2} style={{ marginBottom: '20px' }}>
			<TextField
				label="Pesquisar"
				variant="standard"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				size="small"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<IconSearch />
						</InputAdornment>
					),
					disableUnderline: false,
				}}
			/>
			<FormControl variant="filled" size="small">
				<InputLabel>Categoria</InputLabel>
				<Select
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value as string)}
					label="Categoria"
				>
					<MenuItem value="">
						<em>Todos</em>
					</MenuItem>
					{isLoading ? (
						<MenuItem value="" disabled>
							<CircularProgress size={24} />
						</MenuItem>
					) : error ? (
						<MenuItem value="" disabled>
							Erro ao carregar categorias
						</MenuItem>
					) : (
						categoryItems
					)}
				</Select>
			</FormControl>

			<FormControl variant="filled" size="small">
				<InputLabel>Ordenar por Preço</InputLabel>
				<Select
					value={sortOrder}
					onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
					label="Ordenar por Preço"
				>
					<MenuItem value="asc">Crescente</MenuItem>
					<MenuItem value="desc">Decrescente</MenuItem>
				</Select>
			</FormControl>
		</Stack>
	);
};

export default MenuFilter