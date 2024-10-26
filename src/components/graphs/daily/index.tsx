import { FC, useState} from 'react'
import { Box, Grid, Typography, Card, CardContent } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { People, Receipt, Star } from '@mui/icons-material'
import { useDailyStatistics } from '../../../hooks/charts/use-daily-statistics'

const DailyStatistics: FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
    const { statistics, isLoading, error } = useDailyStatistics(selectedDate)
  
    if (isLoading) return <Typography>Carregando...</Typography>;
    if (error) return <Typography>Erro ao carregar as estatísticas.</Typography>;
    
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Estatísticas do dia:
            </Typography>
            <Box sx={{ mt: 3 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Data"
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        slotProps={{ textField: { fullWidth: true } }}
                    />
                </LocalizationProvider>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <People sx={{ fontSize: 40, color: '#ff5722', marginRight: '10px' }} />
                                    <Box>
                                        <Typography variant="subtitle1">Clientes atendidos</Typography>
                                        <Typography variant="h5">{statistics.clients}</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Receipt sx={{ fontSize: 40, color: '#ff5722', marginRight: '10px' }} />
                                    <Box>
                                        <Typography variant="subtitle1">Pedidos</Typography>
                                        <Typography variant="h5">{statistics.orders}</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Star sx={{ fontSize: 40, color: '#ff5722', marginRight: '10px' }} />
                                    <Box>
                                        <Typography variant="subtitle1">Lucro</Typography>
                                        <Typography variant="h5">
                                            {statistics.profit.toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            })}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default DailyStatistics;
