import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Table, { Column } from '../../../components/table';
import { TableCell } from '../../../components/table-cell';
import { Modal, useModal } from '../../../components/modal';
import { useCustomerOrder } from '../../../hooks/use-custumer-order';
import { HistoricoPedido } from '../../../types/dishes';
import { apiBaseUrl } from '../../../shared/api';
import axios from 'axios';
import { CloseButton, FilterBox, ModalContainer, ModalText, ModalTitle } from './style';
import { TableRowBody } from '../../table/styles';
import { TextField } from '../../forms/login/styles';
import { formatDateString } from '../../../utils/graph';

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
            <FilterBox>
                <TextField
                    label="Data Inicial"
                    type="date"
                    variant="filled"
                    value={filterStartDate}
                    onChange={(e) => setFilterStartDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Data Final"
                    type="date"
                    variant="filled"
                    value={filterEndDate}
                    onChange={(e) => setFilterEndDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button variant="contained" onClick={handleSearch}>
                    Buscar
                </Button>
            </FilterBox>

            <Table
                columns={columns}
                data={filteredPedidos}
                renderData={(row) => (
                    <TableRowBody key={row.id} onClick={() => handleRowClick(row.id)}>
                        <TableCell>{row.numeroPedido}</TableCell>
                        <TableCell>{formatDateString(row.data)}</TableCell>
                        <TableCell>{row.descricao}</TableCell>
                        <TableCell>{row.valorReais}</TableCell>
                        <TableCell>{row.valorPontos}</TableCell>
                    </TableRowBody>
                )}
            />
            <Modal ref={modalRef} title="Detalhes do Pedido">
                <ModalContainer>
                    {selectedOrder ? (
                        <>
                            <ModalTitle variant="h6">Pedido: {selectedOrder.numeroPedido}</ModalTitle>
                            <ModalText>Data: {formatDateString(selectedOrder.data)}</ModalText>
                            <ModalText>Descrição: {selectedOrder.descricao}</ModalText>
                            <ModalText>Valor (R$): {selectedOrder.valorReais}</ModalText>
                            <ModalText>Valor (Pontos): {selectedOrder.valorPontos}</ModalText>
                            <ModalText>Pratos: </ModalText>
                            <Box>
                                {selectedOrder.pratos && selectedOrder.pratos.length > 0 ? (
                                    selectedOrder.pratos.map((prato, index) => (
                                        <ModalText key={index}>
                                            {prato.quantidade}x {prato.nome} - R$ {prato.valor.toFixed(2)}
                                        </ModalText>
                                    ))
                                ) : (
                                    <ModalText>Nenhum prato registrado para este pedido.</ModalText>
                                )}
                            </Box>
                        </>
                    ) : (
                        <Typography variant="body1">Carregando detalhes do pedido...</Typography>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <CloseButton variant="contained" onClick={handleCloseModal}>
                            Fechar
                        </CloseButton>
                    </Box>
                </ModalContainer>
            </Modal>
        </Box>
    );
};

export default CustomerOrder;
