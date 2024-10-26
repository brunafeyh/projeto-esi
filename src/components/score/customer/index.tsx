import { FC } from 'react'
import { Typography, CardContent, Box, Avatar } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { yellow } from '@mui/material/colors'
import { ContainerPontuation } from '../admin/styles'
import { usePontuation } from '../../../hooks/pontuation/use-pontuation'

const CustomerScore: FC<{ cpf: string }> = ({ cpf }) => {
  const { pontuation } = usePontuation(cpf)

  return (
    <ContainerPontuation>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: yellow[700], mr: 2, width: 56, height: 56 }}>
          <StarIcon fontSize="large" />
        </Avatar>
        <CardContent sx={{ textAlign: 'center', p: 0 }}>
          <Typography variant="h5" gutterBottom>
            Sua Pontuação
          </Typography>
          <Typography variant="h2" fontWeight="bold" color="text.primary">
            {pontuation?.pontosAcumulados || 0} pontos
          </Typography>
        </CardContent>
      </Box>
    </ContainerPontuation>
  );
};

export default CustomerScore;
