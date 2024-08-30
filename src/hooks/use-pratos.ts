import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../shared/api';
import { Prato } from '../types/pratos';

export const usePratos = () => {
  const [pratos, setPratos] = useState<Prato[]>([]);

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

  return pratos;
};
