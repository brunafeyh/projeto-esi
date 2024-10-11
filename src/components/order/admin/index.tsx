import { FC, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Box, Button, Chip, IconButton, Typography } from '@mui/material'
import Table from '../../tables/table'
import { TableRowBody } from '../../tables/table/styles'
import { TableCell } from '../../tables/table-cell'
import { Modal, useModal } from '../../modal'
import { TextField } from '../../forms/login/styles'
import { useOrders } from '../../../hooks/order/use-orders'
import { useOrderFilter } from '../../../hooks/order/use-order-filters'
import { ORDER_COLUMNS } from '../../../utils/constants/values'
import { useOrderMutations } from '../../../hooks/order/use-order-mutations'
import { Pedido } from '../../../types/order'
import { formatDateToDDMMYYYY, getString } from '../../../utils/date'
import { ModalContainer, ModalText, ModalTitle } from '../../modal/styles'
import OrderForm from '../../forms/order'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { getStatusColor } from '../../../utils/table'

const AdminOrder: FC = () => {
    const { orders } = useOrders();
    const { addOrder, updateOrder, removeOrder } = useOrderMutations()
    const {
        filteredPedidos,
        filterStartDate,
        filterEndDate,
        setFilterStartDate,
        setFilterEndDate,
        setFilteredPedidos,
    } = useOrderFilter(orders);

    const [orderDetails, setOrderDetails] = useState<Partial<Pedido> | null>(null)
    const [editOrderDetails, setEditOrderDetails] = useState<Partial<Pedido>>()
    const [orderToDelete, setOrderToDelete] = useState<string | null>(null)
    const addOrderModalRef = useModal()
    const detailsModalRef = useModal()
    const editOrderModalRef = useModal()
    const deleteOrderModalRef = useModal()

    const handleOpenEditModal = (id: string) => {
        const order = orders.find((pedido) => pedido.id === id);
        if (order) {
            setEditOrderDetails(order);
            editOrderModalRef.current?.openModal();
        }
    }

    const handleAddOrder = (data: Partial<Pedido>) => {
        data.status = "Em Confirmação";
        addOrder(data as Pedido);
        setFilteredPedidos([...orders, data as Pedido]);
        addOrderModalRef.current?.closeModal();
    }

    const handleEditOrder = (data: Partial<Pedido>) => {
        if (editOrderDetails?.id) {
            updateOrder({ ...data, id: editOrderDetails.id } as Pedido)
        }
        editOrderModalRef.current?.closeModal();
        setEditOrderDetails(undefined);
    }

    const handleOpenAddOrderModal = () => {
        setEditOrderDetails(undefined);
        addOrderModalRef.current?.openModal();
    }

    const handleOpenDetailsModal = (id: string) => {
        const order = orders.find((pedido) => pedido.id === id);
        if (order) {
            setOrderDetails(order);
            detailsModalRef.current?.openModal();
        }
    }

    const handleOpenDeleteModal = (id: string) => {
        setOrderToDelete(id);
        deleteOrderModalRef.current?.openModal();
    }

    const handleDeleteOrder = () => {
        if (orderToDelete) {
            removeOrder(orderToDelete);
            setOrderToDelete(null);
            deleteOrderModalRef.current?.closeModal();
        }
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        label="Data Inicial"
                        type="date"
                        variant="filled"
                        value={filterStartDate}
                        onChange={(e) => setFilterStartDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mr: 2, width: '200px' }}
                    />
                    <TextField
                        label="Data Final"
                        type="date"
                        variant="filled"
                        value={filterEndDate}
                        onChange={(e) => setFilterEndDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mr: 2, width: '200px' }}
                    />
                </Box>
                <Button variant="contained" onClick={handleOpenAddOrderModal}>
                    Adicionar Pedido
                </Button>
            </Box>

            <Table
                columns={ORDER_COLUMNS}
                data={filteredPedidos}
                renderData={(row) => (
                    <TableRowBody key={uuidv4()} onClick={() => handleOpenDetailsModal(row.id)} style={{ cursor: 'pointer' }}>
                        <TableCell>{row.numeroPedido}</TableCell>
                        <TableCell>{formatDateToDDMMYYYY(row.data)}</TableCell>
                        <TableCell>{row.descricao}</TableCell>
                        <TableCell>{row.valorTotal}</TableCell>
                        <TableCell>{row.metodoPagamento}</TableCell>
                        <TableCell>
                            <Chip
                                label={row.status}
                                color={getStatusColor(row.status)}
                                variant="outlined"
                                size="small"
                            />
                        </TableCell>
                        <TableCell>
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenEditModal(row.id);
                                }}
                                sx={{ width: 20, height: 20, mr: 1 }}
                            >
                                <EditIcon sx={{ width: 20, height: 20 }} />
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenDeleteModal(row.id);
                                }}
                                sx={{ width: 20, height: 20 }}
                            >
                                <DeleteIcon sx={{ width: 20, height: 20 }} />
                            </IconButton>
                        </TableCell>
                    </TableRowBody>
                )}
            />

            <Modal ref={addOrderModalRef} title="Adicionar Pedido">
                <ModalContainer>
                    <ModalTitle>Adicionar Pedido</ModalTitle>
                    <OrderForm
                        onSubmit={handleAddOrder}
                        isEditMode={false}
                        onClose={() => addOrderModalRef.current?.closeModal()}
                    />
                </ModalContainer>
            </Modal>

            <Modal ref={editOrderModalRef} title="Editar Pedido">
                <ModalContainer>
                    <ModalTitle>Editar Pedido</ModalTitle>
                    <OrderForm
                        onSubmit={handleEditOrder}
                        defaultValues={editOrderDetails}
                        isEditMode={true}
                        onClose={() => editOrderModalRef.current?.closeModal()}
                    />
                </ModalContainer>
            </Modal>

            <Modal ref={deleteOrderModalRef} title="Confirmar Exclusão">
                <ModalContainer>
                    <Typography>Tem certeza que deseja excluir este pedido?</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button onClick={() => deleteOrderModalRef.current?.closeModal()} variant="outlined">
                            Cancelar
                        </Button>
                        <Button onClick={handleDeleteOrder} variant="contained" color="error" sx={{ ml: 2 }}>
                            Excluir
                        </Button>
                    </Box>
                </ModalContainer>
            </Modal>

            <Modal ref={detailsModalRef} title="Detalhes do Pedido">
                <ModalContainer>
                    {orderDetails ? (
                        <>
                            <ModalTitle mb={2}>{orderDetails.numeroPedido}</ModalTitle>
                            <ModalText>Data: {formatDateToDDMMYYYY(getString(orderDetails.data))}</ModalText>
                            <ModalText>Descrição: {orderDetails.descricao}</ModalText>
                            <ModalText>Valor (R$): {(orderDetails.valorTotal ?? 0).toFixed(2)}</ModalText>
                            <ModalText>Método de Pagamento: {orderDetails.metodoPagamento}</ModalText>
                            <ModalText>Pratos:</ModalText>
                            <Box>
                                {orderDetails.pratos && orderDetails.pratos.length > 0 ? (
                                    orderDetails.pratos.map((prato) => (
                                        <Typography key={uuidv4()} variant="body2">
                                            {prato.quantidade} x {prato.nome} - R$ {(prato.valorReais ?? 0).toFixed(2)}
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
                        <Button onClick={() => detailsModalRef.current?.closeModal()} variant="contained">
                            Fechar
                        </Button>
                    </Box>
                </ModalContainer>
            </Modal>
        </Box>
    )
}

export default AdminOrder