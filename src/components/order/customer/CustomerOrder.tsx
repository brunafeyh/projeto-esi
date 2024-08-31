import React, { useState } from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';
import Table, { Column } from '../../../components/table';
import { TableRowBody } from '../../../components/table/styles';
import { TableCell } from '../../../components/table-cell';
import { Modal, useModal } from '../../../components/modal';
import { ModalText, ModalTitle, Stack } from '../../../pages/pedidos/admin/styles';
import { useCustomerOrder } from '../../../hooks/use-custumer-order';
import { HistoricoPedido } from '../../../types/dishes';
import axios from 'axios';
import { apiBaseUrl } from '../../../shared/api';

const CustomerOrder: React.FC = () => {
    const modalRef = useModal(); 
    const [selectedOrder, setSelectedOrder] = useState<HistoricoPedido | null>(null);

    const customerOrder = useCustomerOrder();

    if (!customerOrder) {
        return <Typography variant="body1">Erro ao carregar os pedidos do cliente.</Typography>;
    }

    const {
        filteredPedidos = [],
        filterStartDate = '',
        filterEndDate = '',
        setFilterStartDate,
        setFilterEndDate,
        handleSearch,
    } = customerOrder;

    const handleRowClick = async (id: string) => {
        try {
            const response = await axios.get(`${apiBaseUrl}/historicoPedidos/${id}`);
            setSelectedOrder(response.data);
            modalRef.current?.openModal();
        } catch (error) {
            console.error('Erro ao buscar detalhes do pedido:', error);
        }
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        modalRef.current?.closeModal();
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
                    <TableRowBody key={row.id} onClick={() => handleRowClick(row.id)} style={{ cursor: 'pointer' }}>
                        <TableCell>{row.numeroPedido}</TableCell>
                        <TableCell>{row.data}</TableCell>
                        <TableCell>{row.descricao}</TableCell>
                        <TableCell>{row.valorReais}</TableCell>
                        <TableCell>{row.valorPontos}</TableCell>
                    </TableRowBody>
                )}
            />
            <Modal ref={modalRef} title="Detalhes do Pedido">
                <Stack spacing={2}>
                    {selectedOrder ? (
                        <>
                            <ModalTitle>Pedido: {selectedOrder.numeroPedido}</ModalTitle>
                            <ModalText>Data: {selectedOrder.data}</ModalText>
                            <ModalText>Descrição: {selectedOrder.descricao}</ModalText>
                            <ModalText>Valor (R$): {selectedOrder.valorReais}</ModalText>
                            <ModalText>Valor (Pontos): {selectedOrder.valorPontos}</ModalText>
                            <ModalText>Pratos: </ModalText>
                            <Box>
                                {selectedOrder.pratos && selectedOrder.pratos.length > 0 ? (
                                    selectedOrder.pratos.map((prato, index) => (
                                        <Typography key={index} variant="body2">
                                            {prato.quantidade}x {prato.nome} - R$ {prato.valor.toFixed(2)}
                                        </Typography>
                                    ))
                                ) : (
                                    <ModalText>Nenhum prato registrado para este pedido.</ModalText>
                                )}
                            </Box>
                        </>
                    ) : (
                        <Typography variant="body1">Carregando detalhes do pedido...</Typography>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button variant="outlined" onClick={handleCloseModal}>
                            Fechar
                        </Button>
                    </Box>
                </Stack>
            </Modal>
        </Box>
    );
};

export default CustomerOrder;
