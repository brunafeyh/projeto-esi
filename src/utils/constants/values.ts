import { Column } from "../../components/table"

export const ACCESS_TOKEN_KEY = 'access_token'
export const IBM_PLEX_SANS_FONT_FAMILY = 'IBM Plex Sans'
export const REFRESH_TOKEN_KEY = 'refresh_token'

export const SECTION_KEY = 'section'
export const INICIAL_SECTION = 'house-recomendations'

export const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

export const BACKGROUND_COLOR_GRAPHS = ['#ff5722', '#03a9f4', '#d32f2f', '#8bc34a', '#ffc107']

export const ORDER_COLUMNS: Column[] = [
    { field: 'numeroPedido', headerName: 'Nº Pedido' },
    { field: 'data', headerName: 'Data' },
    { field: 'descricao', headerName: 'Descrição' },
    { field: 'valorTotal', headerName: 'Valor (R$)' },
    { field: 'metodoPagamento', headerName: 'Método de Pagamento' },
];