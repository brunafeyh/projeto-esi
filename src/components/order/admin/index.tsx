import { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm, useFieldArray } from 'react-hook-form';
import { Box, Button, Typography, MenuItem, Select, TextField as MuiTextField } from '@mui/material';
import Table from '../../tables/table';
import { TableRowBody } from '../../tables/table/styles';
import { TableCell } from '../../tables/table-cell';
import { Modal, useModal } from '../../modal';
import { TextField } from '../../forms/login/styles';
import { useOrders } from '../../../hooks/order/use-orders';
import { useOrderFilter } from '../../../hooks/order/use-order-filters';
import { ORDER_COLUMNS } from '../../../utils/constants/values';
import { useOrderMutations } from '../../../hooks/order/use-order-mutations';
import { Pedido } from '../../../types/order';
import { formatDateToDDMMYYYY, getString } from '../../../utils/date';
import { useDishes } from '../../../hooks/dishes/use-dishes';
import { ModalContainer, ModalText, ModalTitle } from '../../modal/styles';

const AdminOrder: FC = () => {
    const { orders } = useOrders();
    const { dishes } = useDishes();
    const { addOrder } = useOrderMutations();
    const {
        filteredPedidos,
        filterStartDate,
        filterEndDate,
        setFilterStartDate,
        setFilterEndDate,
        setFilteredPedidos,
    } = useOrderFilter(orders);

    const { register, handleSubmit, reset, control, setValue } = useForm<Partial<Pedido>>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'pratos',
    });

    const [orderDetails, setOrderDetails] = useState<Partial<Pedido> | null>(null);
    const addOrderModalRef = useModal();
    const detailsModalRef = useModal();

    const handleAddOrder = (data: Partial<Pedido>) => {
        addOrder(data as Pedido);
        setFilteredPedidos([...orders, data as Pedido]);
        addOrderModalRef.current?.closeModal();
        reset();
    };

    const handleOpenAddOrderModal = () => {
        reset({
            numeroPedido: '',
            descricao: '',
            valorTotal: 0,
            metodoPagamento: '',
            data: '',
            pratos: [],
        });
        addOrderModalRef.current?.openModal();
    };

    const handleDishChange = (index: number, dishId: string) => {
        const selectedDish = dishes.find(dish => dish.id === dishId);
        if (selectedDish) {
            setValue(`pratos.${index}.id`, selectedDish.id);
            setValue(`pratos.${index}.nome`, selectedDish.nome);
            setValue(`pratos.${index}.descricao`, selectedDish.descricao);
            setValue(`pratos.${index}.valorReais`, selectedDish.valorReais);
            setValue(`pratos.${index}.valorPontos`, selectedDish.valorPontos);
            setValue(`pratos.${index}.categoria`, selectedDish.categoria);
            setValue(`pratos.${index}.img`, selectedDish.img);
            setValue(`pratos.${index}.imgFile`, selectedDish.imgFile);
            setValue(`pratos.${index}.quantidade`, 1);
            setValue(`pratos.${index}.valor`, selectedDish.valorReais);
        }
    };

    const handleOpenDetailsModal = (id: string) => {
        const order = orders.find((pedido) => pedido.id === id);
        if (order) {
            setOrderDetails(order);
            detailsModalRef.current?.openModal();
        }
    };

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
                    </TableRowBody>
                )}
            />
            <Modal ref={addOrderModalRef} title="Adicionar Novo Pedido">
                <ModalContainer>
                    <form onSubmit={handleSubmit(handleAddOrder)}>
                        <ModalTitle mb={2}>Adicionar Pedido</ModalTitle>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nº Pedido"
                            type="text"
                            fullWidth
                            variant="filled"
                            {...register('numeroPedido')}
                        />
                        <TextField
                            margin="dense"
                            label="Descrição"
                            type="text"
                            fullWidth
                            variant="filled"
                            {...register('descricao')}
                        />
                        <TextField
                            margin="dense"
                            label="Valor (R$)"
                            type="number"
                            fullWidth
                            variant="filled"
                            {...register('valorTotal', { valueAsNumber: true })}
                        />
                        <TextField
                            margin="dense"
                            label="Método de Pagamento"
                            type="text"
                            fullWidth
                            variant="filled"
                            {...register('metodoPagamento')}
                        />
                        <TextField
                            margin="dense"
                            label="Data"
                            type="date"
                            fullWidth
                            variant="filled"
                            {...register('data')}
                            InputLabelProps={{ shrink: true }}
                        />

                        <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>Pratos</Typography>
                        {fields.map((_, index) => (
                            <Box key={uuidv4()} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    defaultValue=""
                                    {...register(`pratos.${index}.id`)}
                                    onChange={(e) => handleDishChange(index, e.target.value)}
                                    sx={{ mr: 2 }}
                                >
                                    <MenuItem value="" disabled>Selecione um prato</MenuItem>
                                    {dishes.map((dish) => (
                                        <MenuItem key={uuidv4()} value={dish.id}>
                                            {dish.nome} - R$ {(dish.valorReais ?? 0).toFixed(2)}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <MuiTextField
                                    label="Quantidade"
                                    type="number"
                                    variant="filled"
                                    {...register(`pratos.${index}.quantidade`, { valueAsNumber: true })}
                                    sx={{ width: '100px', ml: 2 }}
                                />
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => remove(index)}
                                    sx={{ ml: 2 }}
                                >
                                    Remover
                                </Button>
                            </Box>
                        ))}

                        <Button
                            variant="contained"
                            sx={{ width: '100%', marginBottom: 2 }}
                            onClick={() =>
                                append({
                                    id: '',
                                    nome: '',
                                    descricao: '',
                                    valorReais: 0,
                                    valorPontos: 0,
                                    categoria: '',
                                    img: '',
                                    imgFile: null,
                                    quantidade: 1,
                                    valor: 0,
                                })
                            }
                        >
                            Adicionar Prato
                        </Button>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                            <Button onClick={() => addOrderModalRef.current?.closeModal()} variant="outlined">
                                Cancelar
                            </Button>
                            <Button type="submit" variant="contained" sx={{ ml: 2 }}>
                                Adicionar
                            </Button>
                        </Box>
                    </form>
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
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt : 2}}>
                        <Button onClick={() => detailsModalRef.current?.closeModal()} variant="contained">
                            Fechar
                        </Button>
                    </Box>
                </ModalContainer>
            </Modal>
        </Box>
    );
};

export default AdminOrder