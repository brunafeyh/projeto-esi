import { FC } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import { TitleCard } from '../../../../pages/home/styles';
import { DeleteIcon, EditIcon } from '../../../../pages/stock/styles';
import { IconButton } from './styles';
import { Dish } from '../../../../types/dish';

interface DisheCardProps {
	dish: Dish
	onEdit: (dishe: Dish) => void
	onDelete: (dishe: Dish) => void
}

const DisheCard: FC<DisheCardProps> = ({ dish, onEdit, onDelete }) => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				sx={{ height: 140 }}
				image={dish.image || '/images/logo-restaurante-clara.png'}
				title={dish.name}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{dish.name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{dish.description}
				</Typography>
			</CardContent>
			<CardActions sx={{ justifyContent: 'space-between' }}>
				<TitleCard>R$ {dish.reaisPrice}</TitleCard>
				<TitleCard>{dish.pointsPrice} pontos</TitleCard>
				<Chip label={dish.category.name} /> 
				<IconButton color="secondary" aria-label="edit" onClick={() => onEdit(dish)}>
					<EditIcon />
				</IconButton>
				<IconButton color="error" aria-label="delete" onClick={() => onDelete(dish)}>
					<DeleteIcon />
				</IconButton>
			</CardActions>
		</Card>
	)
}

export default DisheCard
