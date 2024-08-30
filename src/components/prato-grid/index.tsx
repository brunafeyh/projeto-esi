import { FC } from 'react';
import { Grid } from '@mui/material';
import PratoCard from './cards/prato-card';
import { Prato } from '../../hooks/use-filtered-pratos';

interface PratoGridProps {
	pratos: Prato[];
	adicionarAoCarrinho: (prato: Prato) => void;
}

const PratoGrid: FC<PratoGridProps> = ({ pratos, adicionarAoCarrinho }) => {
	return (
		<Grid container spacing={2}>
			{pratos.map((prato) => (
				<Grid item xs={12} sm={6} md={4} lg={3} key={prato.id}>
					<PratoCard prato={prato} adicionarAoCarrinho={adicionarAoCarrinho} />
				</Grid>
			))}
		</Grid>
	);
};

export default PratoGrid;
