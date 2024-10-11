import { FC } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, Chip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { TitleCard } from '../../../../pages/home/styles';
import { Dishe } from '../../../../types/dishes';
import { useAuth } from '../../../../hooks/use-auth';
import { toast } from 'react-toastify';

interface DisheCardProps {
	dishe: Dishe;
	addToCart: (prato: Dishe) => void;
}

const DisheCard: FC<DisheCardProps> = ({ dishe, addToCart }) => {
	const { isAuthenticated } = useAuth()
	const handleAddtoCard = () => {
		if (!isAuthenticated()) toast.error('Para adicionar um item ao carrinho você deve estar logado!')
		else addToCart(dishe)
	}
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				sx={{ height: 140 }}
				image={dishe.img || '/images/logo-restaurante-clara.png'}
				title={dishe.nome}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{dishe.nome}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{dishe.descricao}
				</Typography>
			</CardContent>
			<CardActions sx={{ justifyContent: 'space-between' }}>
				<IconButton color="primary" aria-label="add to shopping cart" onClick={handleAddtoCard}>
					<ShoppingCartIcon />
				</IconButton>
				<TitleCard>R$ {dishe.valorReais}</TitleCard>
				<TitleCard>{dishe.valorPontos} pontos</TitleCard>
				<Chip label={dishe.categoria} />
			</CardActions>
		</Card>
	);
};

export default DisheCard;
