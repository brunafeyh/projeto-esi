import React, { useState, useEffect } from 'react';
import { TextField, Box } from '@mui/material';
import axios from 'axios';
import { apiBaseUrl } from '../../../shared/api';
import Table, { Column } from '../../../components/table';
import { TableRowBody } from '../../../components/table/styles';
import { TableCell } from '../../../components/table-cell-business-proposal';
import { Button } from './style';

interface HistoricoPedido {
    id: string;
    numeroPedido: string;
    descricao: string;
    valorReais: number;
    valorPontos: number;
    data: string;
}

const CustomerOrder: React.FC = () => {
    const [historicoPedidos, setHistoricoPedidos] = useState<HistoricoPedido[]>([]);
    const [filteredPedidos, setFilteredPedidos] = useState<HistoricoPedido[]>([]);
    const [filterStartDate, setFilterStartDate] = useState<string>('');
    const [filterEndDate, setFilterEndDate] = useState<string>('');

    useEffect(() => {
        const fetchHistoricoPedidos = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/historicoPedidos`);
                const sortedData = response.data.sort((a: HistoricoPedido, b: HistoricoPedido) => 
                    new Date(a.data).getTime() - new Date(b.data).getTime()
                );
                setHistoricoPedidos(sortedData);
                setFilteredPedidos(sortedData);
            } catch (error) {
                console.error('Erro ao buscar histórico de pedidos:', error);
            }
        };

        fetchHistoricoPedidos();
    }, []);

    const handleSearch = () => {
        let filtered = historicoPedidos;

        if (filterStartDate && filterEndDate) {
            // Filtrar entre as duas datas
            filtered = historicoPedidos.filter((pedido) => 
                new Date(pedido.data) >= new Date(filterStartDate) &&
                new Date(pedido.data) <= new Date(filterEndDate)
            );
        } else if (filterStartDate) {
            // Filtrar a partir da data inicial
            filtered = historicoPedidos.filter((pedido) => 
                new Date(pedido.data) >= new Date(filterStartDate)
            );
        } else if (filterEndDate) {
            // Filtrar até a data final
            filtered = historicoPedidos.filter((pedido) => 
                new Date(pedido.data) <= new Date(filterEndDate)
            );
        }

        setFilteredPedidos(filtered);
    };

    const columns: Column[] = [
        { field: 'numeroPedido', headerName: 'Nº Pedido' },
        { field: 'data', headerName: 'Data' },
        { field: 'descricao', headerName: 'Descrição' },
        { field: 'valorReais', headerName: 'Valor (R$)' },
        { field: 'valorPontos', headerName: 'Valor (Pontos)' },
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: 2 }}>
                <TextField
                    label="Data Inicial"
                    type="date"
                    variant="outlined"
                    value={filterStartDate}
                    onChange={(e) => setFilterStartDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ mr: 2, width: '200px' }}
                />
                <TextField
                    label="Data Final"
                    type="date"
                    variant="outlined"
                    value={filterEndDate}
                    onChange={(e) => setFilterEndDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ mr: 2, width: '200px' }}
                />
                <Button variant="contained" onClick={handleSearch}>
                    Buscar
                </Button>
            </Box>

            <Table
                columns={columns}
                data={filteredPedidos}
                renderData={(row) => (
                    <TableRowBody key={row.id}>
                        <TableCell>{row.numeroPedido}</TableCell>
                        <TableCell>{row.data}</TableCell>
                        <TableCell>{row.descricao}</TableCell>
                        <TableCell>{row.valorReais}</TableCell>
                        <TableCell>{row.valorPontos}</TableCell>
                    </TableRowBody>
                )}
            />
        </Box>
    );
};

export default CustomerOrder;