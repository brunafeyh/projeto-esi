import { FC } from 'react';
import { Stack, MenuItem, InputAdornment } from '@mui/material';
import { IconSearch, Select, TextField, FormControl, InputLabel } from '../../pages/cardapio/styles';

interface CardapioFilterProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	selectedCategory: string;
	setSelectedCategory: (category: string) => void;
	sortOrder: 'asc' | 'desc';
	setSortOrder: (order: 'asc' | 'desc') => void;
}

const CardapioFilter: FC<CardapioFilterProps> = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, sortOrder, setSortOrder }) => {
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
					<MenuItem value="Carnes">Carnes</MenuItem>
					<MenuItem value="Massas">Massas</MenuItem>
					<MenuItem value="Vegano">Vegano</MenuItem>
					<MenuItem value="Sobremesas">Sobremesas</MenuItem>
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

export default CardapioFilter;
