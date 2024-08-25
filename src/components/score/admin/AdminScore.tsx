import React, { useState } from 'react';
import { PageLayout } from '../../../layouts/page-layout';
import { TextField, Box, Button, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { apiBaseUrl } from '../../../shared/api';

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
        <PageLayout title="Pontuação do Cliente">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                <TextField
                    label="CPF"
                    variant="filled"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    sx={{ width: '400px' }}
                />
                <Button variant="contained" onClick={buscarPontos}>
                    Buscar Pontos
                </Button>
            </Box>
            {erro && <Typography color="error" sx={{ mb: 2 }}>{erro}</Typography>}
            {pontos !== null && (
                <Card sx={{ minWidth: 275, mt: 2, textAlign: 'center', boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Pontuação do Cliente
                        </Typography>
                        <Typography variant="h1" fontWeight="bold" color="primary.main">
                            {pontos}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            pontos acumulados
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </PageLayout>
    );
};

export default AdminScore;
