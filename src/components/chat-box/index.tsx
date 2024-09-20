import React, { useState } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, TextField, Button, Box, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close'; // Ícone para fechar o dialog
import { toast } from 'react-toastify';
import { useDishes } from '../../hooks/use-dishes';
import { useCart } from '../../hooks/use-cart';
import useDishIngredients from '../../hooks/use-dishe-ingredients';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const ChatBox: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedDishId, setSelectedDishId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  const { dishes, isLoading } = useDishes();
  const { addToCart } = useCart();
  const { data: dishIngredients = [] } = useDishIngredients(selectedDishId || '');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 

  const botResponses = (userMessage: string) => {
    if (userMessage.toLowerCase().includes('menu')) {
      if (isLoading) {
        return 'Carregando o menu...';
      }

      return (
        'Aqui está o nosso menu:\n' +
        dishes
          .map((dish, index) => `${index + 1}. ${dish.nome} - R$${dish.valorReais.toFixed(2)}`)
          .join('\n') +
        '\nDigite o número do prato para ver mais detalhes ou fazer o pedido.'
      );
    }

    const selectedDish = dishes[parseInt(userMessage) - 1];
    if (selectedDish) {
      setSelectedDishId(selectedDish.id);
      return `Aqui estão os ingredientes para ${selectedDish.nome}: ${dishIngredients
        .map((ing) => `${ing.nome} (${ing.quantidade})`)
        .join(', ')}. Deseja adicionar ao carrinho? Responda com "sim" ou "não".`;
    }

    if (userMessage.toLowerCase() === 'sim') {
      const lastDishIndex = parseInt(chatHistory[chatHistory.length - 1].text.split('.')[0]) - 1;
      const dishToAdd = dishes[lastDishIndex];
      addToCart(dishToAdd);
      return 'Prato adicionado ao carrinho com sucesso! Você pode continuar navegando pelo menu ou finalizar o pedido.';
    } else if (userMessage.toLowerCase() === 'não') {
      return 'Tudo bem! Se precisar de mais alguma coisa, estou aqui.';
    } else {
      return 'Desculpe, não entendi. Você pode ver o "menu" ou fazer um "pedido".';
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { sender: 'user', text: message }]);
      const botMessage = botResponses(message);
      setTimeout(() => {
        setChatHistory((prev) => [...prev, { sender: 'bot', text: botMessage }]);
      }, 500);

      setMessage('');
    } else {
      toast.error('Por favor, digite uma mensagem');
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen} style={{ color: '#FFF' }}>
        <ChatIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}  sx={{minWidth: '300px'}}>
        <DialogTitle>
          Chat com o Restaurante
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#000',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{minWidth: '300px'}} >
          <Box sx={{ mb: 2, maxHeight: '400px', overflowY: 'auto' }}>
            {chatHistory.map((msg, index) => (
              <Typography
                key={index}
                align={msg.sender === 'user' ? 'right' : 'left'}
                style={{
                  backgroundColor: msg.sender === 'user' ? '#e0f7fa' : '#f1f1f1',
                  borderRadius: '10px',
                  padding: '8px',
                  marginBottom: '8px',
                  display: 'inline-block',
                }}
              >
                {msg.text}
              </Typography>
            ))}
          </Box>
          <TextField
            label="Digite sua mensagem"
            fullWidth
            variant='filled'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} variant="contained" color="primary" style={{ marginTop: '10px' }}>
            Enviar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatBox;