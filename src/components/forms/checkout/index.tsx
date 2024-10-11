import { FC } from 'react'
import { Box, Button, Typography, Divider, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { useForm } from 'react-hook-form'
import { TextField } from '../login/styles'

interface CheckoutFormProps {
    totalAmount: string
    discountValue: number
    finalValue: number
    pointsToUse: number
    maxPoints: number
    paymentMethod: string
    onPointsChange: (points: number) => void
    onPaymentMethodChange: (method: string) => void
    handleFinalizeOrder: (data: any) => void
    handleCloseModal: () => void
}

const CheckoutForm: FC<CheckoutFormProps> = ({
    totalAmount,
    discountValue,
    finalValue,
    pointsToUse,
    maxPoints,
    paymentMethod,
    onPointsChange,
    onPaymentMethodChange,
    handleFinalizeOrder,
    handleCloseModal,
}) => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
        <form onSubmit={handleSubmit(handleFinalizeOrder)}>
            <Box p={4} bgcolor="white" borderRadius={2} boxShadow={24} mx="auto" mt={10} width={400}>
                <Typography variant="h6">Detalhes da Compra</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Total: R$ {totalAmount}</Typography>
                <Typography variant="h6">Desconto Aplicado: R$ {discountValue}</Typography>
                <Typography variant="h6">Total com Desconto: R$ {finalValue}</Typography>
                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" mb={1}>Pontos Disponíveis: {maxPoints}</Typography>
                <TextField
                    label="Pontos a Utilizar"
                    type="number"
                    variant="filled"
                    value={pointsToUse}
                    onChange={(e) => onPointsChange(Math.min(Number(e.target.value), maxPoints))}
                    fullWidth
                />
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Método de Pagamento</Typography>
                <RadioGroup value={paymentMethod} onChange={(e) => onPaymentMethodChange(e.target.value)}>
                    <FormControlLabel value="cartao" control={<Radio />} label="Cartão de Crédito" />
                    <FormControlLabel value="dinheiro" control={<Radio />} label="Dinheiro" />
                    <FormControlLabel value="pix" control={<Radio />} label="Pix" />
                </RadioGroup>

                {paymentMethod === 'cartao' && (
                    <Box>
                        <TextField
                            label="Número do Cartão"
                            fullWidth
                            margin="normal"
                            variant='filled'
                            error={!!errors.cardNumber}
                            helperText={errors.cardNumber ? 'Número do cartão é obrigatório' : ''}
                            {...register('cardNumber', { required: true })}
                        />
                        <TextField
                            label="Validade"
                            fullWidth
                            margin="normal"
                            variant='filled'
                            error={!!errors.expiryDate}
                            helperText={errors.expiryDate ? 'Validade é obrigatória' : ''}
                            {...register('expiryDate', { required: true })}
                        />
                        <TextField
                            label="CVV"
                            fullWidth
                            margin="normal"
                            variant='filled'
                            error={!!errors.cvv}
                            helperText={errors.cvv ? 'CVV é obrigatório' : ''}
                            {...register('cvv', { required: true })}
                        />
                        <TextField
                            label="Nome do Titular"
                            fullWidth
                            margin="normal"
                            variant='filled'
                            error={!!errors.cardHolder}
                            helperText={errors.cardHolder ? 'Nome do titular é obrigatório' : ''}
                            {...register('cardHolder', { required: true })}
                        />
                    </Box>
                )}
                {paymentMethod === 'pix' && (
                    <Box textAlign="center">
                        <img src="https://www.maxatacadista.com.br/assets/images/corrente-do-bem/sm-hotsite-corrente-do-bem-qr-uopeccan.png" alt="QR Code" />
                    </Box>
                )}

                <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                        Concluir
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

export default CheckoutForm