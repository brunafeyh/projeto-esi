import { FC } from 'react';
import { Grid } from '@mui/material';
import { Prato } from '../../types/dishes';
import DisheCard from './cards/dishe-card';

interface DisheGridProps {
	dishes: Prato[];
	addToCart: (prato: Prato) => void;
}

const DisheGrid: FC<DisheGridProps> = ({ dishes, addToCart }) => {
	return (
		<Grid container spacing={2}>
			{dishes.map((dishe) => (
				<Grid item xs={12} sm={6} md={4} lg={3} key={dishe.id}>
					<DisheCard dishe={dishe} addToCart={addToCart} />
				</Grid>
			))}
		</Grid>
	);
};

export default DisheGrid;
