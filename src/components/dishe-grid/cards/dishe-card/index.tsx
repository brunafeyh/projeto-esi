import { FC } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, Chip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { TitleCard } from '../../../../pages/home/styles';
import { Prato } from '../../../../types/dishes';

interface DisheCardProps {
	prato: Prato;
	addToCard: (prato: Prato) => void;
}

const DisheCard: FC<DisheCardProps> = ({ prato, addToCard }) => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				sx={{ height: 140 }}
				image={prato.img || '/images/logo-restaurante-clara.png'}
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
				<IconButton color="primary" aria-label="add to shopping cart" onClick={() => addToCard(prato)}>
					<ShoppingCartIcon />
				</IconButton>
				<TitleCard>R$ {prato.valorReais.toFixed(2)}</TitleCard>
				<TitleCard>{prato.valorPontos} pontos</TitleCard>
				<Chip label={prato.categoria} />
			</CardActions>
		</Card>
	);
};

export default DisheCard;
