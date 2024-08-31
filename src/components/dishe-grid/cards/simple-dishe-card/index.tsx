import { FC } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

interface SimpleDisheCardProps {
    img: string;
    nome: string;
    quantidadeVendida: number;
}

const SimpleDisheCard: FC<SimpleDisheCardProps> = ({ img, nome, quantidadeVendida }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={img || '/images/logo-restaurante-clara.png'}
                title={nome}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {nome}
                </Typography>
                <Box mt={1}>
                    <Typography variant="body2" color="text.secondary">
                        {quantidadeVendida} vendidos
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SimpleDisheCard;
