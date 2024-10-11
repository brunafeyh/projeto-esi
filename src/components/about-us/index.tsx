import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { TitlePage } from '../../pages/home/styles';

const AboutUs: FC = () => {
  return (
    <Stack direction="column" spacing={2} style={{ textAlign: 'center', marginTop: '40px', alignItems: 'center' }}>
      <TitlePage variant="h6" component="div">
        Nossa Casa
      </TitlePage>
      <img
        src="https://wallpapers.com/images/hd/restaurant-steak-dinner-over-fireplace-9deedgcb2up9t4dj.jpg"
        alt="Restaurante"
        style={{ maxWidth: '50%', height: 'auto' }}
      />
      <Typography variant="body1" component="div" style={{ backgroundColor: '#424242', color: '#fff', padding: '10px', display: 'inline-block' }}>
        Rua Rio Grande, 678<br />
        Vila A - Foz do Iguaçu
      </Typography>
    </Stack>
  )
}

export default AboutUs
