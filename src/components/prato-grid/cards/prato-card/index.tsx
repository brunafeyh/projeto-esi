import { FC } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, Chip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { TitleCard } from '../../../../pages/home/styles';
import { Prato } from '../../../../types/pratos';

interface PratoCardProps {
	prato: Prato;
	adicionarAoCarrinho: (prato: Prato) => void;
}

const PratoCard: FC<PratoCardProps> = ({ prato, adicionarAoCarrinho }) => {
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
				<IconButton color="primary" aria-label="add to shopping cart" onClick={() => adicionarAoCarrinho(prato)}>
					<ShoppingCartIcon />
				</IconButton>
				<TitleCard>R$ {prato.valorReais.toFixed(2)}</TitleCard>
				<TitleCard>{prato.valorPontos} pontos</TitleCard>
				<Chip label={prato.categoria} />
			</CardActions>
		</Card>
	);
};

export default PratoCard;
