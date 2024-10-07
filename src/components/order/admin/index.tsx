import { FC, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import Table from '../../tables/table'
import { TableRowBody } from '../../tables/table/styles'
import { TableCell } from '../../tables/table-cell'
import { Modal, useModal } from '../../modal'
import { ContainedButton, ModalText, ModalTitle, Stack } from '../../../pages/pedidos/admin/styles'
import { TextField } from '../../forms/login/styles'
import { useOrders } from '../../../hooks/order/use-orders'
import { useOrderFilter } from '../../../hooks/order/use-order-filters'
import { ORDER_COLUMNS } from '../../../utils/constants/values'
import { useOrderMutations } from '../../../hooks/order/use-order-mutations'
import { Pedido } from '../../../types/order'

const AdminOrder: FC = () => {
    const { orders } = useOrders()
    const { addOrder } = useOrderMutations()
    const {
        filteredPedidos,
        filterStartDate,
        filterEndDate,
        setFilterStartDate,
        setFilterEndDate,
        handleSearch,
        setFilteredPedidos,
    } = useOrderFilter(orders)

    const [orderDetails, setOrderDetails] = useState<Partial<Pedido> | null>(null)
    const addOrderModalRef = useModal()
    const detailsModalRef = useModal()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setOrderDetails((prevOrder) => ({
            ...prevOrder,
            [name]: value,
        }))
    }

    const handleAddOrder = () => {
        if (orderDetails) {
            addOrder(orderDetails as Pedido);
            setFilteredPedidos([...orders, orderDetails as Pedido]);
            addOrderModalRef.current?.closeModal();
        }
    }

    const resetNewOrder = () => {
        setOrderDetails({
            numeroPedido: '',
            descricao: '',
            valorTotal: 0,
            metodoPagamento: '',
            data: '',
            pratos: [],
        })
    }

    const handleOpenAddOrderModal = () => {
        resetNewOrder()
        addOrderModalRef.current?.openModal()
    }

    const handleOpenDetailsModal = (id: string) => {
        const order = orders.find((pedido) => pedido.id === id)
        if (order) {
            setOrderDetails(order)
            detailsModalRef.current?.openModal()
        }
    }

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
                        InputLabelProps={{ shrink: true }}
                        sx={{ mr: 2, width: '200px' }}
                    />
                    <TextField
                        label="Data Final"
                        type="date"
                        variant="outlined"
                        value={filterEndDate}
                        onChange={(e) => setFilterEndDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
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
                columns={ORDER_COLUMNS}
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
                        value={orderDetails?.numeroPedido || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Descrição"
                        type="text"
                        fullWidth
                        variant="filled"
                        name="descricao"
                        value={orderDetails?.descricao || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Valor (R$)"
                        type="number"
                        fullWidth
                        variant="filled"
                        name="valorTotal"
                        value={orderDetails?.valorTotal || 0}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Método de Pagamento"
                        type="text"
                        fullWidth
                        variant="filled"
                        name="metodoPagamento"
                        value={orderDetails?.metodoPagamento || ''}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Data"
                        type="date"
                        fullWidth
                        variant="filled"
                        name="data"
                        value={orderDetails?.data || ''}
                        onChange={handleInputChange}
                        InputLabelProps={{ shrink: true }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                        <Button onClick={() => addOrderModalRef.current?.closeModal()} variant="outlined">
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
                    {orderDetails ? (
                        <>
                            <ModalTitle>Pedido: {orderDetails.numeroPedido}</ModalTitle>
                            <ModalText>Data: {orderDetails.data}</ModalText>
                            <ModalText>Descrição: {orderDetails.descricao}</ModalText>
                            <ModalText>Valor (R$): {orderDetails.valorTotal}</ModalText>
                            <ModalText>Método de Pagamento: {orderDetails.metodoPagamento}</ModalText>
                            <ModalText>Pratos:</ModalText>
                            <Box>
                                {orderDetails.pratos && orderDetails.pratos.length > 0 ? (
                                    orderDetails.pratos.map((prato, index) => (
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
                        <Button onClick={() => detailsModalRef.current?.closeModal()} variant="outlined">
                            Fechar
                        </Button>
                    </Box>
                </Stack>
            </Modal>
        </Box>
    )
}

export default AdminOrder
