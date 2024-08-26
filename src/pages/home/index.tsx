import { FC, useEffect, useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Grid, IconButton, Chip } from '@mui/material';
import { PageLayout } from '../../layouts/page-layout';
import { TitleCard, TitlePage, TitlePageDown } from './styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import { toast } from 'react-toastify';
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
  

const HomePage: FC = () => {
  const [pratos, setPratos] = useState<Prato[]>([]);
  const [carrinho, setCarrinho] = useState<CartItem[]>([]);


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
	  // Verifica se o item já existe no carrinho
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
		  quantidade: 1, // Adiciona 1 unidade ao carrinho
		  valorTotal: prato.valorReais,
		  valorReais: prato.valorReais,
		});
		setCarrinho((prevCarrinho) => [...prevCarrinho, response.data]);
	  }
	  toast.success('Prato adicionado ao carrinho com sucesso!');
	  window.location.reload()
	} catch (error) {
	  console.error('Erro ao adicionar ao carrinho:', error);
	  toast.error('Erro ao adicionar ao carrinho.');
	}
  };
  

  const recomendados = pratos.slice(0, 3);

  return (
    <PageLayout title="HomePage">
      <TitlePage>Os mais vendidos</TitlePage>

      <Grid container spacing={2}>
        {pratos.map((prato) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={prato.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={prato.img || '/images/logo-restaurante-clara.png'} // Use uma imagem padrão se não houver imagem
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
                <TitleCard>{prato.valorPontos} pontos</TitleCard>
                <Chip label={prato.categoria} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

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
    </PageLayout>
  );
};

export default HomePage;
