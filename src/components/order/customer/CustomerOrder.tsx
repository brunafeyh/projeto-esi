import { useState, useEffect, FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Table, { Column } from '../../../components/table';
import { TableRowBody } from '../../table/styles';
import { TableCell } from '../../../components/table-cell';
import { Modal, useModal } from '../../../components/modal';
import { Pedido, useOrders } from '../../../hooks/use-orders';
import { useAuth } from '../../../hooks/use-auth';
import { apiBaseUrl } from '../../../shared/api';
import axios from 'axios';
import { CloseButton, FilterBox, ModalContainer, ModalText, ModalTitle } from './style';
import { TextField } from '../../forms/login/styles';
import { useOrderFilter } from '../../../hooks/use-order-filters';

const CustomerOrder: FC = () => {
    const modalRef = useModal();
    const { user } = useAuth();
    const { orders } = useOrders();
    const [customerOrders, setCustomerOrders] = useState<Pedido[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Pedido | null>(null);

    const {
        filteredPedidos,
        filterStartDate,
        filterEndDate,
        setFilterStartDate,
        setFilterEndDate,
        handleSearch,
    } = useOrderFilter(customerOrders);

    useEffect(() => {
        if (orders && user) {
            const userOrders = orders.filter(order => order.cpf === user.cpf);
            setCustomerOrders(userOrders);
            handleSearch(); 
        }
    }, [orders, user]); 

    const handleRowClick = async (id: string) => {
        try {
            const response = await axios.get(`${apiBaseUrl}/pedidos/${id}`);
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
        { field: 'valorTotal', headerName: 'Valor (R$)' },
        { field: 'metodoPagamento', headerName: 'Método de Pagamento' },
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
                    <TableRowBody key={row.id} onClick={() => handleRowClick(row.id)} sx={{ cursor: 'pointer' }}>
                        <TableCell>{row.numeroPedido}</TableCell>
                        <TableCell>{row.data}</TableCell>
                        <TableCell>{row.descricao}</TableCell>
                        <TableCell>{row.valorTotal}</TableCell>
                        <TableCell>{row.metodoPagamento}</TableCell>
                    </TableRowBody>
                )}
            />

            <Modal ref={modalRef} title="Detalhes do Pedido">
                <ModalContainer>
                    {selectedOrder ? (
                        <>
                            <ModalTitle variant="h6">Pedido: {selectedOrder.numeroPedido}</ModalTitle>
                            <ModalText>Data: {selectedOrder.data}</ModalText>
                            <ModalText>Descrição: {selectedOrder.descricao}</ModalText>
                            <ModalText>Valor (R$): {selectedOrder.valorTotal}</ModalText>
                            <ModalText>Método de Pagamento: {selectedOrder.metodoPagamento}</ModalText>
                            <ModalText>Pratos: </ModalText>
                            <Box>
                                {selectedOrder.pratos && selectedOrder.pratos.length > 0 ? (
                                    selectedOrder.pratos.map((prato, index) => (
                                        <ModalText key={index}>
                                            {prato.quantidade}x {prato.nome} - R$ {prato.valor ? prato.valor.toFixed(2) : '0.00'}
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
