import { FC, useState } from 'react';
import { TextField, Box, Button, Typography, Card, CardContent, Avatar, CircularProgress } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';
import { ContainerPontuation } from './styles';
import { usePontuation } from '../../../hooks/pontuation/use-pontuation';

const AdminScore: FC = () => {
    const [cpf, setCpf] = useState('');
    const { pontuation, isLoading, error } = usePontuation(cpf);

    const handleBuscarPontos = () => {
        if (!cpf.trim()) {
            alert('Por favor, insira um CPF válido.');
        }
    }

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
                <Button variant="contained" onClick={handleBuscarPontos}>
                    Buscar Pontos
                </Button>
            </Box>
            {isLoading && <CircularProgress />}
            {error && <Typography color="error" sx={{ mb: 2 }}>{error?.message || 'Erro ao buscar pontuação'}</Typography>}
            {pontuation && (
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
                                {pontuation.pontosAcumulados} pontos
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
            )}
        </ContainerPontuation>
    );
};

export default AdminScore