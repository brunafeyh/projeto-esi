import React, { useState, useEffect, useRef } from 'react';
import { PageLayout } from '../../../layouts/page-layout';
import { Typography, Card, CardContent, TextField, Box, Avatar, TableRow, TableCell } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';
import Table from '../../../components/table';
import axios from 'axios';
import { apiBaseUrl } from '../../../shared/api';


interface Column {
    field: string;
    headerName: string;
}

interface HistoricoPedido {
    id: string;
    numeroPedido: string;
    descricao: string;
    valorReais: number;
    valorPontos: number;
    data: string;
}

const CustomerScore: React.FC = () => {
    const [filterDate, setFilterDate] = useState<string>('');
    const [historicoPedidos, setHistoricoPedidos] = useState<HistoricoPedido[]>([]);
    const dateInputRef = useRef<HTMLInputElement>(null);

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


    const filteredRows = historicoPedidos.filter(row => {
        if (!filterDate) return true;
        return row.data === filterDate;
    });

    const columns: Column[] = [
        { field: 'numeroPedido', headerName: 'Número Pedido' },
        { field: 'descricao', headerName: 'Descrição' },
        { field: 'valorReais', headerName: 'Valor (R$)' },
        { field: 'valorPontos', headerName: 'Valor (Pontos)' },
        { field: 'data', headerName: 'Data' },
    ];

    const renderData = (row: Record<string, any>, columns: Column[]) => (
        <TableRow key={row.id}>
            {columns.map((column) => (
                <TableCell key={column.field}>{row[column.field]}</TableCell>
            ))}
        </TableRow>
    );

    return (
        <PageLayout title="Pontuação">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                <Card sx={{ display: 'flex', alignItems: 'center', minWidth: 275, p: 3, mr: 8 }}>
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
                </Card>

                <TextField
                    label="Filtrar por data"
                    type="date"
                    variant="filled"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputRef={dateInputRef}
                    onClick={() => dateInputRef.current?.focus()}
                />
            </Box>

            <Box sx={{ mt: 8 }}>
                <Table
                    columns={columns}
                    data={filteredRows}
                    renderData={(row) => renderData(row, columns)}
                />
            </Box>
        </PageLayout>
    );
};

export default CustomerScore;
