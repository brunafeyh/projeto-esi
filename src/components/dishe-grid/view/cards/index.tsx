import { FC } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, Chip, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { TitleCard } from '../../../../pages/home/styles';
import { useAuth } from '../../../../hooks/use-auth';
import { toast } from 'react-toastify';
import { Dish } from '../../../../types/dish';
import { Modal } from '../../../modal';
import useModal from '../../../../hooks/use-modal';
import { ModalContainer, ModalText, ModalTitle } from '../../../modal/styles';

interface DisheCardProps {
	dish: Dish;
	addToCart: (prato: Dish) => void;
}

const DisheCard: FC<DisheCardProps> = ({ dish, addToCart }) => {
	const { isAuthenticated } = useAuth()
	const modalRef = useModal()

	const handleAddToCart = () => {
		if (!isAuthenticated()) toast.error('Para adicionar um item ao carrinho você deve estar logado!')
		else addToCart(dish)
	}

	const handleOpenModal = () => modalRef.current?.openModal()

	const handleCloseModal = () => modalRef.current?.closeModal()

	return (
		<>
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
					<IconButton color="primary" aria-label="add to shopping cart" onClick={handleAddToCart}>
						<ShoppingCartIcon />
					</IconButton>
					<TitleCard>R$ {dish.reaisPrice}</TitleCard>
					<TitleCard>{dish.pointsPrice} pontos</TitleCard>
					<Chip label={dish.category.name} />
					<IconButton color="secondary" aria-label="expand dish details" onClick={handleOpenModal} sx={{ width: 16, height: 16 }}>
						<OpenInFullIcon sx={{ width: 16, height: 16 }} />
					</IconButton>
				</CardActions>
			</Card>

			<Modal ref={modalRef}>
				<ModalContainer>
					<CardMedia
						component="img"
						height="200"
						image={dish.image || '/images/logo-restaurante-clara.png'}
						alt={dish.name}
						sx={{ objectFit: 'cover', mb: 2 }}
					/>
					<ModalTitle variant="h4" gutterBottom>
						{dish.name}
					</ModalTitle>

					<ModalText variant="h6">Descrição:</ModalText>
					<Typography gutterBottom>{dish.description}</Typography>

					<Typography variant="h6" sx={{ mt: 2 }}>Ingredientes:</Typography>
					<List>
						{dish.dishIngredientDTOList.map((ingredientDTO) => (
							<ListItem key={ingredientDTO.id}>
								<ListItemText
									primary={ingredientDTO.ingredient.name}
									secondary={`${ingredientDTO.quantity} ${ingredientDTO.ingredient.measurementUnit.acronym}`}
								/>
							</ListItem>
						))}
					</List>

					<Typography variant="h6" sx={{ mt: 2 }}>Preço:</Typography>
					<Typography gutterBottom>R$ {dish.reaisPrice}</Typography>

					<Typography variant="h6" sx={{ mt: 2 }}>Preço em pontos:</Typography>
					<Typography>{dish.pointsPrice} pontos</Typography>

					<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
						<Button variant="outlined" color="primary" onClick={handleCloseModal}>
							Fechar
						</Button>
					</Box>
				</ModalContainer>
			</Modal>

		</>
	);
};

export default DisheCard;
