import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../shared/api';
import { Prato } from '../types/dishes';

export const useDishes = () => {
  const [dishes, setDishes] = useState<Prato[]>([]);

  useEffect(() => {
    const fetchPratos = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/pratos`);
        setDishes(response.data);
      } catch (error) {
        console.error('Erro ao buscar pratos:', error);
      }
    };

    fetchPratos();
  }, []);

  return dishes;
};
