import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Grid, Card, CardActions, CardContent, CardMedia, IconButton, Chip, Stack } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PageLayout } from '../../layouts/page-layout';
import { TitleCard, TitlePage, TitlePageDown } from './styles';
import { apiBaseUrl } from '../../shared/api';

interface Prato {
  id: number;
  nome: string;
  descricao: string;
  valorReais: number;
  valorPontos: number;
  categoria: string;
  img: string;
}

interface CartItem extends Prato {
  quantidade: number;
  valorTotal: number;
}

const HomePage: React.FC = () => {
  const [pratos, setPratos] = useState<Prato[]>([]);
  const [carrinho, setCarrinho] = useState<CartItem[]>([]);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const fetchPratos = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/pratos`);
        setPratos(response.data);
      } catch (error) {
        console.error('Erro ao buscar pratos:', error);
      }
    };

    fetchPratos();
  }, []);

  const adicionarAoCarrinho = async (prato: Prato) => {
    try {
      const itemExistente = carrinho.find(item => item.id === prato.id);
      if (itemExistente) {
        setCarrinho(prevCarrinho =>
          prevCarrinho.map(item =>
            item.id === prato.id
              ? { ...item, quantidade: item.quantidade + 1, valorTotal: item.valorTotal + prato.valorReais }
              : item
          )
        );
      } else {
        const response = await axios.post('http://localhost:3000/carrinho', {
          id: prato.id,
          nome: prato.nome,
          quantidade: 1,
          valorTotal: prato.valorReais,
          valorReais: prato.valorReais,
        });
        setCarrinho((prevCarrinho) => [...prevCarrinho, response.data]);
      }
      toast.success('Prato adicionado ao carrinho com sucesso!');
      window.location.reload();
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      toast.error('Erro ao adicionar ao carrinho.');
    }
  };

  const recomendados = pratos.slice(0, 3);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <PageLayout title="HomePage">
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="Menu Tabs"
        sx={{
          '& .MuiTabs-indicator': { backgroundColor: '#e53935' },
          '& .Mui-selected': { color: '#e53935' }, 
        }}
      >
        <Tab label="Recomendações da Casa" />
        <Tab label="Os Mais Vendidos" />
        <Tab label="Sobre Nós" />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <TitlePageDown>Recomendação da cozinha</TitlePageDown>
        <Grid container spacing={2}>
          {recomendados.map((prato) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={prato.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={prato.img || '/images/logo-restaurante-clara.png'}
                  title={prato.nome}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {prato.nome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {prato.descricao}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <IconButton color="primary" aria-label="add to shopping cart" onClick={() => adicionarAoCarrinho(prato)}>
                    <ShoppingCartIcon />
                  </IconButton>
                  <TitleCard>R$ {prato.valorReais.toFixed(2)}</TitleCard>
                  <Chip label={prato.categoria} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <TitlePage>Os mais vendidos</TitlePage>
        <Grid container spacing={2}>
          {pratos.map((prato) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={prato.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={prato.img || '/images/logo-restaurante-clara.png'}
                  title={prato.nome}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {prato.nome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {prato.descricao}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <IconButton color="primary" aria-label="add to shopping cart" onClick={() => adicionarAoCarrinho(prato)}>
                    <ShoppingCartIcon />
                  </IconButton>
                  <TitleCard>R$ {prato.valorReais.toFixed(2)}</TitleCard>
                  <Chip label={prato.categoria} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
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
      </TabPanel>
    </PageLayout>
  );
};

function TabPanel(props: { children?: React.ReactNode; value: number; index: number }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

export default HomePage;
