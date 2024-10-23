import { FC } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, Chip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { TitleCard } from '../../../../pages/home/styles';
import { Dishe } from '../../../../types/dishes';
import { useAuth } from '../../../../hooks/use-auth';
import { toast } from 'react-toastify';
import { useCategoryByIdFromList } from '../../../../hooks/category/use-category-by-id';
import Loading from '../../../loading';

interface DisheCardProps {
	dishe: Dishe;
	addToCart: (prato: Dishe) => void;
}

const DisheCard: FC<DisheCardProps> = ({ dishe, addToCart }) => {
	const { isAuthenticated } = useAuth()
	const { category, isLoading } = useCategoryByIdFromList(dishe.categoryId)
	const handleAddtoCard = () => {
		if (!isAuthenticated()) toast.error('Para adicionar um item ao carrinho você deve estar logado!')
		else addToCart(dishe)
	}
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
				<IconButton color="primary" aria-label="add to shopping cart" onClick={handleAddtoCard}>
					<ShoppingCartIcon />
				</IconButton>
				<TitleCard>R$ {dishe.reaisPrice}</TitleCard>
				<TitleCard>{dishe.pointsPrice} pontos</TitleCard>
				<Chip label={category?.name} />
			</CardActions>
		</Card>
	);
};

export default DisheCard;
