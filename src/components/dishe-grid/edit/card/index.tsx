import { FC } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import { TitleCard } from '../../../../pages/home/styles';
import { Dishe } from '../../../../types/dishes';
import { DeleteIcon, EditIcon } from '../../../../pages/stock/styles';
import { IconButton } from './styles';

interface DisheCardProps {
	dishe: Dishe
	onEdit: (dishe: Dishe) => void
	onDelete: (dishe: Dishe) => void
}

const DisheCard: FC<DisheCardProps> = ({ dishe, onEdit, onDelete }) => {
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
				<TitleCard>R$ {dishe.valorReais}</TitleCard>
				<TitleCard>{dishe.valorPontos} pontos</TitleCard>
				<Chip label={dishe.categoria} />
				<IconButton color="secondary" aria-label="edit" onClick={() => onEdit(dishe)}>
					<EditIcon />
				</IconButton>
				<IconButton color="error" aria-label="delete" onClick={() => onDelete(dishe)}>
					<DeleteIcon />
				</IconButton>
			</CardActions>
		</Card>
	)
}

export default DisheCard
