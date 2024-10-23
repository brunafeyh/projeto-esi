import { FC } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import { TitleCard } from '../../../../pages/home/styles';
import { Dishe } from '../../../../types/dishes';
import { DeleteIcon, EditIcon } from '../../../../pages/stock/styles';
import { IconButton } from './styles';
import { useCategoryByIdFromList } from '../../../../hooks/category/use-category-by-id';
import Loading from '../../../loading';

interface DisheCardProps {
	dishe: Dishe
	onEdit: (dishe: Dishe) => void
	onDelete: (dishe: Dishe) => void
}

const DisheCard: FC<DisheCardProps> = ({ dishe, onEdit, onDelete }) => {
	const { category, isLoading } = useCategoryByIdFromList(dishe.categoryId)
	if(isLoading) return <Loading/>
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia
				sx={{ height: 140 }}
				image={dishe.image || '/images/logo-restaurante-clara.png'}
				title={dishe.name}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{dishe.name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{dishe.description}
				</Typography>
			</CardContent>
			<CardActions sx={{ justifyContent: 'space-between' }}>
				<TitleCard>R$ {dishe.reaisPrice}</TitleCard>
				<TitleCard>{dishe.pointsPrice} pontos</TitleCard>
				<Chip label={category?.name} /> 
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
