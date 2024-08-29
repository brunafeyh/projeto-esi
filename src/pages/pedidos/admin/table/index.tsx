import { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'
import { apiBaseUrl } from '../../../../shared/api'
import Table, { Column } from '../../../../components/table'
import { TableRowBody } from '../../../../components/table/styles'
import { TableCell } from '../../../../components/table-cell-business-proposal'
import { Modal, useModal } from '../../../../components/modal'
import { ContainedButton, ModalTitle, Stack } from '../styles'
import { TextField } from '../../../../components/forms/login/styles'

interface HistoricoPedido {
    id: string;
    numeroPedido: string;
    descricao: string;
    valorReais: number;
    valorPontos: number;
    data: string;
}

const AdminOrder: React.FC = () => {
    const [historicoPedidos, setHistoricoPedidos] = useState<HistoricoPedido[]>([]);
    const [filteredPedidos, setFilteredPedidos] = useState<HistoricoPedido[]>([]);
    const [filterStartDate, setFilterStartDate] = useState<string>('');
    const [filterEndDate, setFilterEndDate] = useState<string>('');
    const modalRef = useModal(); // Cria a referência para o Modal
    const [newOrder, setNewOrder] = useState<Partial<HistoricoPedido>>({
        numeroPedido: '',
        descricao: '',
        valorReais: 0,
        valorPontos: 0,
        data: '',
    });

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
            filtered = historicoPedidos.filter((pedido) =>
                new Date(pedido.data) >= new Date(filterStartDate) &&
                new Date(pedido.data) <= new Date(filterEndDate)
            );
        } else if (filterStartDate) {
            filtered = historicoPedidos.filter((pedido) =>
                new Date(pedido.data) >= new Date(filterStartDate)
            );
        } else if (filterEndDate) {
            filtered = historicoPedidos.filter((pedido) =>
                new Date(pedido.data) <= new Date(filterEndDate)
            );
        }

        setFilteredPedidos(filtered);
    };

    const handleOpen = () => {
        modalRef.current?.openModal();
    };

    const handleClose = () => {
        modalRef.current?.closeModal();
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
            const response = await axios.post(`${apiBaseUrl}/historicoPedidos`, newOrder);
            const updatedPedidos = [...historicoPedidos, response.data];
            setHistoricoPedidos(updatedPedidos);
            setFilteredPedidos(updatedPedidos);
            toast.success('Pedido adicionado com sucesso!');
            handleClose();
        } catch (error) {
            console.error('Erro ao adicionar pedido:', error);
            toast.error('Erro ao adicionar pedido.');
        }
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
                <ContainedButton variant="contained" onClick={handleOpen}>
                    Adicionar Pedido
                </ContainedButton>
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

            <Modal ref={modalRef} title="Adicionar Novo Pedido">
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
                        value={newOrder.numeroPedido}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Descrição"
                        type="text"
                        fullWidth
                        variant="filled"
                        name="descricao"
                        value={newOrder.descricao}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Valor (R$)"
                        type="number"
                        fullWidth
                        variant="filled"
                        name="valorReais"
                        value={newOrder.valorReais}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Valor (Pontos)"
                        type="number"
                        fullWidth
                        variant="filled"
                        name="valorPontos"
                        value={newOrder.valorPontos}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Data"
                        type="date"
                        fullWidth
                        variant="filled"
                        name="data"
                        value={newOrder.data}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                    <Button onClick={handleClose} variant="outlined">
                        Cancelar
                    </Button>
                    <ContainedButton onClick={handleAddOrder} variant="contained" sx={{ ml: 2 }}>
                        Adicionar
                    </ContainedButton>
                </Box>
                </Stack>
            </Modal>
        </Box>
    );
};

export default AdminOrder;
