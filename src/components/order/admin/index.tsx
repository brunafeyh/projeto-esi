import { FC, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Table, { Column } from '../../table';
import { TableRowBody } from '../../table/styles';
import { TableCell } from '../../table-cell';
import { Modal, useModal } from '../../modal';
import { ContainedButton, ModalText, ModalTitle, Stack } from '../../../pages/pedidos/admin/styles';
import { TextField } from '../../forms/login/styles';
import { Pedido, useOrders } from '../../../hooks/use-orders';
import { useOrderFilter } from '../../../hooks/use-order-filters';

const AdminOrder: FC = () => {
    const { orders, addOrder } = useOrders();
    const {
        filteredPedidos,
        filterStartDate,
        filterEndDate,
        setFilterStartDate,
        setFilterEndDate,
        handleSearch,
        setFilteredPedidos
    } = useOrderFilter(orders); 
    const [newOrder, setNewOrder] = useState<Partial<Pedido>>({});
    const [selectedOrder, setSelectedOrder] = useState<Pedido | null>(null);
    const addOrderModalRef = useModal();
    const detailsModalRef = useModal();

    const handleRowClick = (id: string) => {
        const order = orders.find((pedido) => pedido.id === id);
        return order || null;
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value,
        }));
    };

    const handleAddOrder = async () => {
        try {
            await addOrder(newOrder as Pedido);
            setFilteredPedidos([...orders, newOrder as Pedido]);
            addOrderModalRef.current?.closeModal();
        } catch (error) {
            console.error('Erro ao adicionar pedido:', error);
        }
    };

    const resetNewOrder = () => {
        setNewOrder({
            numeroPedido: '',
            descricao: '',
            valorTotal: 0,
            metodoPagamento: '',
            data: '',
            pratos: [],
        });
    };

    const handleOpenAddOrderModal = () => {
        resetNewOrder();
        addOrderModalRef.current?.openModal();
    };

    const handleCloseAddOrderModal = () => {
        addOrderModalRef.current?.closeModal();
    };

    const handleOpenDetailsModal = async (id: string) => {
        const order = handleRowClick(id);
        if (order) {
            setSelectedOrder(order);
            detailsModalRef.current?.openModal();
        }
    };

    const handleCloseDetailsModal = () => {
        setSelectedOrder(null);
        detailsModalRef.current?.closeModal();
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                    <ContainedButton variant="contained" onClick={handleSearch}>
                        Buscar
                    </ContainedButton>
                </Box>
                <ContainedButton variant="contained" onClick={handleOpenAddOrderModal}>
                    Adicionar Pedido
                </ContainedButton>
            </Box>

            <Table
                columns={columns}
                data={filteredPedidos}
                renderData={(row) => (
                    <TableRowBody key={row.id} onClick={() => handleOpenDetailsModal(row.id)} style={{ cursor: 'pointer' }}>
                        <TableCell>{row.numeroPedido}</TableCell>
                        <TableCell>{row.data}</TableCell>
                        <TableCell>{row.descricao}</TableCell>
                        <TableCell>{row.valorTotal}</TableCell>
                        <TableCell>{row.metodoPagamento}</TableCell>
                    </TableRowBody>
                )}
            />

            <Modal ref={addOrderModalRef} title="Adicionar Novo Pedido">
                <Stack>
                    <ModalTitle>Adicionar Pedido</ModalTitle>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nº Pedido"
                        type="text"
                        fullWidth
                        variant="filled"
                        name="numeroPedido"
                        value={newOrder.numeroPedido || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Descrição"
                        type="text"
                        fullWidth
                        variant="filled"
                        name="descricao"
                        value={newOrder.descricao || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Valor (R$)"
                        type="number"
                        fullWidth
                        variant="filled"
                        name="valorTotal"
                        value={newOrder.valorTotal || 0}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Método de Pagamento"
                        type="text"
                        fullWidth
                        variant="filled"
                        name="metodoPagamento"
                        value={newOrder.metodoPagamento || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Data"
                        type="date"
                        fullWidth
                        variant="filled"
                        name="data"
                        value={newOrder.data || ''}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                        <Button onClick={handleCloseAddOrderModal} variant="outlined">
                            Cancelar
                        </Button>
                        <ContainedButton onClick={handleAddOrder} variant="contained" sx={{ ml: 2 }}>
                            Adicionar
                        </ContainedButton>
                    </Box>
                </Stack>
            </Modal>

            <Modal ref={detailsModalRef} title="Detalhes do Pedido">
                <Stack spacing={2}>
                    {selectedOrder ? (
                        <>
                            <ModalTitle>Pedido: {selectedOrder.numeroPedido}</ModalTitle>
                            <ModalText>Data: {selectedOrder.data}</ModalText>
                            <ModalText>Descrição: {selectedOrder.descricao}</ModalText>
                            <ModalText>Valor (R$): {selectedOrder.valorTotal}</ModalText>
                            <ModalText>Método de Pagamento: {selectedOrder.metodoPagamento}</ModalText>
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
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                        <Button onClick={handleCloseDetailsModal} variant="outlined">
                            Fechar
                        </Button>
                    </Box>
                </Stack>
            </Modal>
        </Box>
    );
};

export default AdminOrder;
