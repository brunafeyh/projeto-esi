import React, { useState, useEffect } from 'react';
import { Typography,  CardContent, Box, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';
import axios from 'axios';
import { apiBaseUrl } from '../../../shared/api';
import { ContainerPontuation } from '../admin/styles';

interface HistoricoPedido {
    id: string;
    numeroPedido: string;
    descricao: string;
    valorReais: number;
    valorPontos: number;
    data: string;
}

const CustomerScore: React.FC = () => {
    const [historicoPedidos, setHistoricoPedidos] = useState<HistoricoPedido[]>([]);

    useEffect(() => {
        const fetchHistoricoPedidos = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/historicoPedidos`);
                setHistoricoPedidos(response.data);
            } catch (error) {
                console.error('Erro ao buscar histórico de pedidos:', error);
            }
        };

        fetchHistoricoPedidos();
    }, []);

    return (
        <ContainerPontuation>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Avatar sx={{ bgcolor: yellow[700], mr: 2, width: 56, height: 56 }}>
                        <StarIcon fontSize="large" />
                    </Avatar>
                    <CardContent sx={{ textAlign: 'center', p: 0 }}>
                        <Typography variant="h5" gutterBottom>
                            Sua Pontuação
                        </Typography>
                        <Typography variant="h2" fontWeight="bold" color="text.primary">
                            {historicoPedidos.reduce((total, item) => total + item.valorPontos, 0)} pontos
                        </Typography>
                    </CardContent>
            </Box>
        </ContainerPontuation>
    );
};

export default CustomerScore