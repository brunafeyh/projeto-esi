import { FC, useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Grid, IconButton, Chip, Stack, TextField, MenuItem, Select, FormControl, InputLabel, InputAdornment } from '@mui/material';
import { PageLayout } from '../../layouts/page-layout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiBaseUrl } from '../../shared/api';
import { TitleCard, TitlePage } from '../home/styles';
import { IconSearch } from './styles';

export interface Prato {
	id: number;
	nome: string;
	descricao: string;
	valorReais: number;
	valorPontos: number;
	categoria: string;
	img: string;
}

interface CartItem extends Prato {
	quantidade: number;
	valorTotal: number;
}

const Cardapio: FC = () => {
	const [pratos, setPratos] = useState<Prato[]>([]);
	const [carrinho, setCarrinho] = useState<CartItem[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
	const [selectedCategory, setSelectedCategory] = useState('');

	useEffect(() => {
		const fetchPratos = async () => {
			try {
				const response = await axios.get(`${apiBaseUrl}/pratos`);
				setPratos(response.data);
			} catch (error) {
				console.error('Erro ao buscar pratos:', error);
			}
		};

		fetchPratos();
	}, []);

	const adicionarAoCarrinho = async (prato: Prato) => {
		try {
			const itemExistente = carrinho.find(item => item.id === prato.id);
			if (itemExistente) {
				setCarrinho(prevCarrinho =>
					prevCarrinho.map(item =>
						item.id === prato.id
							? { ...item, quantidade: item.quantidade + 1, valorTotal: item.valorTotal + prato.valorReais }
							: item
					)
				);
			} else {
				const response = await axios.post('http://localhost:3000/carrinho', {
					id: prato.id,
					nome: prato.nome,
					quantidade: 1,
					valorTotal: prato.valorReais,
					valorReais: prato.valorReais,
				});
				setCarrinho((prevCarrinho) => [...prevCarrinho, response.data]);
			}
			toast.success('Prato adicionado ao carrinho com sucesso!');
			window.location.reload()
		} catch (error) {
			console.error('Erro ao adicionar ao carrinho:', error);
			toast.error('Erro ao adicionar ao carrinho.');
		}
	};

	const filteredPratos = pratos
		.filter(prato => prato.nome.toLowerCase().includes(searchTerm.toLowerCase()))
		.filter(prato => selectedCategory ? prato.categoria === selectedCategory : true)
		.sort((a, b) => sortOrder === 'asc' ? a.valorReais - b.valorReais : b.valorReais - a.valorReais);

	return (
		<PageLayout title="Cardápio">
			<TitlePage>Cardápio</TitlePage>

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
						disableUnderline: false, // Mostra a linha inferior
					}}
					sx={{
						backgroundColor: '#f5f5f5', // Cor de fundo
						'& .MuiInputBase-root': {
							borderBottom: '1px solid #b0bec5', // Borda inferior de cor suave
							paddingLeft: '8px',
							paddingRight: '8px',
							display: 'flex',
							alignItems: 'center', // Centraliza o conteúdo verticalmente
						},
						'& .MuiInputLabel-root': {
							color: '#9e9e9e', // Cor do label quando não em foco
							transform: 'translate(0, 6px) scale(1)', // Move o label mais para baixo
						},
						'& .MuiInputLabel-shrink': {
							color: '#424242', // Cor do label quando em foco
							transform: 'translate(4px, 3px) scale(0.75)', // Ajusta o label encolhido mais para baixo
						},
						'& .MuiInputBase-input': {
							paddingTop: '6px', // Ajusta o preenchimento superior para deixar o campo mais fino
							paddingBottom: '6px', // Ajusta o preenchimento inferior
							fontSize: '14px', // Tamanho da fonte menor para um campo mais fino
						},
						width: '100%', // Largura completa do campo
						maxWidth: '600px', // Largura máxima
					}}
				/>
				<FormControl variant="outlined" size="small" sx={{ minWidth: '200px' }}>
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

				<FormControl variant="outlined" size="small" sx={{ minWidth: '200px' }}>
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

			<Grid container spacing={2}>
				{filteredPratos.map((prato) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={prato.id}>
						<Card sx={{ maxWidth: 345 }}>
							<CardMedia
								sx={{ height: 140 }}
								image={prato.img || '/images/logo-restaurante-clara.png'} // Use uma imagem padrão se não houver imagem
								title={prato.nome}
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									{prato.nome}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{prato.descricao}
								</Typography>
							</CardContent>
							<CardActions sx={{ justifyContent: 'space-between' }}>
								<IconButton color="primary" aria-label="add to shopping cart" onClick={() => adicionarAoCarrinho(prato)}>
									<ShoppingCartIcon />
								</IconButton>
								<TitleCard>R$ {prato.valorReais.toFixed(2)}</TitleCard>
								<TitleCard>{prato.valorPontos} pontos</TitleCard>
								<Chip label={prato.categoria} />
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</PageLayout>
	);
};

export default Cardapio;
