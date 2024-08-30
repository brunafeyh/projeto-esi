import { FC } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, Chip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { TitleCard } from '../../../../pages/home/styles';
import { Prato } from '../../../../types/dishes';

interface DisheCardProps {
	dishe: Prato;
	addToCart: (prato: Prato) => void;
}

const DisheCard: FC<DisheCardProps> = ({ dishe, addToCart }) => {
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
				<IconButton color="primary" aria-label="add to shopping cart" onClick={() => addToCart(dishe)}>
					<ShoppingCartIcon />
				</IconButton>
				<TitleCard>R$ {dishe.valorReais.toFixed(2)}</TitleCard>
				<TitleCard>{dishe.valorPontos} pontos</TitleCard>
				<Chip label={dishe.categoria} />
			</CardActions>
		</Card>
	);
};

export default DisheCard;