import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { PageLayout } from '../../layouts/page-layout'
import { TitlePage } from './styles'
import { FC } from 'react'

const HomePage: FC = () => {
	return (
		<PageLayout title="HomePage">
			<TitlePage>Os mais vendidos</TitlePage>

			<TitlePage>Recomendação da cozinha</TitlePage>
			<Card sx={{ maxWidth: 345 }}>
				<CardMedia
					sx={{ height: 140 }}
					image="/images/logo-restaurante-clara.png"
					title="green iguana"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						Lizard
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Lizards are a widespread group of squamate reptiles, with over 6,000
						species, ranging across all continents except Antarctica
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">Share</Button>
					<Button size="small">Learn More</Button>
				</CardActions>
			</Card>
		</PageLayout>
	)
}

export default HomePage
