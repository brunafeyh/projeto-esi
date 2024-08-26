import { useState } from 'react';
import { TextField, Box, Button, Typography, Card, CardContent, Avatar } from '@mui/material';
import axios from 'axios';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';
import { apiBaseUrl } from '../../../shared/api';
import { ContainerPontuation } from './styles';

const AdminScore: React.FC = () => {
    const [cpf, setCpf] = useState('');
    const [pontos, setPontos] = useState<number | null>(null);
    const [erro, setErro] = useState('');
    

    const buscarPontos = async () => {
        if (!cpf.trim()) {
            setErro('Por favor, insira um CPF válido.');
            setPontos(null);
            return;
        }

        try {
            const response = await axios.get(`${apiBaseUrl}/clientes?cpf=${cpf}`);
            console.log(response.data)
            if (response.data.length > 0) {
                setPontos(response.data[0].pontos);
                setErro('');
            } else {
                setPontos(null);
                setErro('Cliente não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar pontos:', error);
            setErro('Erro ao buscar pontos. Tente novamente.');
        }
    };

    return (
        <ContainerPontuation>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                <TextField
                    label="CPF"
                    variant="filled"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    sx={{ width: '300px' }}
                />
                <Button variant="contained" onClick={buscarPontos}>
                    Buscar Pontos
                </Button>
            </Box>
            {erro && <Typography color="error" sx={{ mb: 2 }}>{erro}</Typography>}
            {pontos !== null && (
                <Card sx={{ minWidth: 275, mt: 2, textAlign: 'center', boxShadow: 3, p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: yellow[700], width: 56, height: 56 }}>
                            <StarIcon fontSize="large" />
                        </Avatar>
                        <CardContent sx={{ p: 0 }}>
                            <Typography variant="h5" gutterBottom>
                                Pontuação do cliente
                            </Typography>
                            <Typography variant="h2" fontWeight="bold" color="text.primary">
                                {pontos} pontos
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
            )}
        </ContainerPontuation>
    );
};

export default AdminScore;
