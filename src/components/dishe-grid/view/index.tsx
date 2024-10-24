import { FC } from 'react';
import { Grid } from '@mui/material';
import DisheCard from './cards';
import { Dish } from '../../../types/dish';

interface DisheGridProps {
	dishes: Dish[];
	addToCart: (prato: Dish) => void;
}

const DisheGrid: FC<DisheGridProps> = ({ dishes, addToCart }) => {
	return (
		<Grid container spacing={2}>
			{dishes.map((dish) => (
				<Grid item xs={12} sm={6} md={4} lg={3} key={dish.id}>
					<DisheCard dish={dish} addToCart={addToCart} />
				</Grid>
			))}
		</Grid>
	);
};

export default DisheGrid;
