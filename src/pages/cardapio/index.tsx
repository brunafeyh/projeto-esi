import { FC, useState } from 'react';
import { PageLayout } from '../../layouts/page-layout';
import { TitlePage } from '../home/styles';
import { useFilteredDishes } from '../../hooks/use-filtered-dishes';
import CardapioFilter from '../../components/cardapio-filter';
import EditDisheGrid from '../../components/dishe-grid/edit-dishe-grid';
import { useAuth } from '../../hooks/use-auth';
import DisheGrid from '../../components/dishe-grid';
import { useDishes } from '../../hooks/use-dishes';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { Prato } from '../../types/dishes';

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

	const { user } = useAuth();
	const { addDish } = useDishes();

	const [open, setOpen] = useState(false);
	const [newDish, setNewDish] = useState<Partial<Prato>>({
		nome: '',
		descricao: '',
		valorReais: 0,
		valorPontos: 0,
		categoria: '',
		img: ''
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewDish((prevDish) => ({
			...prevDish,
			[name]: name === 'valorReais' || name === 'valorPontos' ? parseFloat(value) || 0 : value,
		}));
	};
	const handleOpenModal = () => setOpen(true);
	const handleCloseModal = () => {
		setOpen(false);
		setNewDish({
			nome: '',
			descricao: '',
			valorReais: 0,
			valorPontos: 0,
			categoria: '',
			img: ''
		});
	};

	// Handle dish addition
	const handleAddDish = async () => {
		try {
			await addDish(newDish as Prato);
			handleCloseModal();
		} catch (error) {
			console.error("Erro ao adicionar prato:", error);
		}
	};

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
				<>
					<Button variant="contained" onClick={handleOpenModal} sx={{ mb: 2 }}>
						Adicionar Novo Prato
					</Button>
					<EditDisheGrid dishes={filteredDishes} />
				</>
			) : (
				<DisheGrid dishes={filteredDishes} addToCart={addToCart} />
			)}

			<Dialog open={open} onClose={handleCloseModal}>
				<DialogTitle>Adicionar Novo Prato</DialogTitle>
				<DialogContent>
					<TextField
						margin="dense"
						label="Nome"
						type="text"
						fullWidth
						variant="outlined"
						name="nome"
						value={newDish.nome}
						onChange={handleInputChange}
						required
					/>
					<TextField
						margin="dense"
						label="Descrição"
						type="text"
						fullWidth
						variant="outlined"
						name="descricao"
						value={newDish.descricao}
						onChange={handleInputChange}
						required
					/>
					<TextField
						margin="dense"
						label="Valor (R$)"
						type="number"
						fullWidth
						variant="outlined"
						name="valorReais"
						value={newDish.valorReais}
						onChange={handleInputChange}
						required
					/>
					<TextField
						margin="dense"
						label="Valor em Pontos"
						type="number"
						fullWidth
						variant="outlined"
						name="valorPontos"
						value={newDish.valorPontos}
						onChange={handleInputChange}
						required
					/>
					<TextField
						margin="dense"
						label="Categoria"
						type="text"
						fullWidth
						variant="outlined"
						name="categoria"
						value={newDish.categoria}
						onChange={handleInputChange}
						required
					/>
					<TextField
						margin="dense"
						label="URL da Imagem"
						type="text"
						fullWidth
						variant="outlined"
						name="img"
						value={newDish.img}
						onChange={handleInputChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseModal} variant="outlined">
						Cancelar
					</Button>
					<Button onClick={handleAddDish} variant="contained" sx={{ ml: 1 }}>
						Adicionar
					</Button>
				</DialogActions>
			</Dialog>
		</PageLayout>
	);
};

export default Cardapio;
