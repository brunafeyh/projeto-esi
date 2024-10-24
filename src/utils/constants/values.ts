import { Column } from "../../components/tables/table"
import { DishValueForm } from "../../types/dishes"
import { Pedido } from "../../types/order"

export const ACCESS_TOKEN_KEY = 'access_token'
export const IBM_PLEX_SANS_FONT_FAMILY = 'IBM Plex Sans'
export const REFRESH_TOKEN_KEY = 'refresh_token'

export const SECTION_KEY = 'section'
export const INICIAL_SECTION = 'recommendations'
export const INICIAL_SECTION_SETTINGS = 'categories'

export const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

export const BACKGROUND_COLOR_GRAPHS = ['#ff5722', '#03a9f4', '#d32f2f', '#8bc34a', '#ffc107']

export const ORDER_COLUMNS: Column[] = [
    { field: 'numeroPedido', headerName: 'Nº Pedido' },
    { field: 'data', headerName: 'Data' },
    { field: 'descricao', headerName: 'Descrição' },
    { field: 'valorTotal', headerName: 'Valor (R$)' },
    { field: 'metodoPagamento', headerName: 'Método de Pagamento' },
    { field: 'status', headerName: 'Status' },
    { field: 'edit', headerName: '' },
]


export const CLIENT_ORDER_COLUMNS: Column[] = [
  { field: 'numeroPedido', headerName: 'Nº Pedido' },
  { field: 'data', headerName: 'Data' },
  { field: 'descricao', headerName: 'Descrição' },
  { field: 'valorTotal', headerName: 'Valor (R$)' },
  { field: 'metodoPagamento', headerName: 'Método de Pagamento' },
  { field: 'status', headerName: 'Status' },
]

export const DEFAULT_ORDER: Pedido = {
  id: '',
  cpf: '',
  numeroPedido: '',
  descricao: '',
  valorTotal: 0,
  metodoPagamento: '',
  data: '',
  pratos: [],
  status: 'Em confirmação'
}

export const DEFAULT_DISHE: DishValueForm = {
  id: '',
  name: '',
  description: '',
  reaisPrice: 0,
  pointsPrice: 0,
  reaisCostValue: 0, 
  image: '',
  isAvailable: true,
  categoryId: 0, 
  dishIngredientFormDTOList: [], 
  imgFile: null, 
};