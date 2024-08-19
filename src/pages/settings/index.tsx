import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { TitlePageSettings } from './styles';
import { PageLayout } from '../../layouts/page-layout';
import { Box, TextField, Typography } from '@mui/material';
import { apiBaseUrl } from '../../shared/api';

const Settings: FC = () => {
    const [prato, setPrato] = useState<any | null>(null); 
    const [pratoId, setPratoId] = useState<number | null>(null); 


    useEffect(() => {
        const fetchData = async () => {
            if (pratoId !== null) {
                try {
                    const pratoResponse = await axios.get(`${apiBaseUrl}/pratos/${pratoId}`);
                    setPrato(pratoResponse.data);
					console.log(pratoResponse.data)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [pratoId]); // Dependência para atualizar quando o ID mudar

    const handlePratoIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = parseInt(event.target.value, 10);
        setPratoId(id);
    };

    return (
        <PageLayout title="Settings">
            <TitlePageSettings>Configurações</TitlePageSettings>
            <Box>
                <Typography>Buscar Prato por ID</Typography>
                <TextField
                    type="number"
                    placeholder="Digite o ID do prato"
                    onChange={handlePratoIdChange}
                />
                {prato ? (
                    <div>
                        <h2>Detalhes do Prato</h2>
						<Typography> {prato.nome} </Typography>
						<Typography> {prato.descricao} </Typography>
						<Typography> {prato.valorReais} </Typography>
                        <pre>{JSON.stringify(prato, null, 2)}</pre>
                    </div>
                ) : (
                    <p>Informe um ID para buscar um prato específico.</p>
                )}
            </Box>
        </PageLayout>
    );
};

export default Settings;
