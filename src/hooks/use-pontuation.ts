import { useState } from 'react';
import PontuationService, { PontuationCliente } from '../services/pontuation';

const pontuationService = new PontuationService();

export const usePontuation = () => {
  const [pontuation, setPontuationState] = useState<PontuationCliente | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPontuation = async (cpf: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await pontuationService.getPontuation(cpf);
      setPontuationState(data);
    } catch (err) {
      setError('Erro ao buscar a pontuação');
    } finally {
      setLoading(false);
    }
  };

  const updatePoints = async (pointsToAdd: number) => {
    if (pontuation && pontuation.id) {
      setLoading(true);
      setError(null);
      try {
        const updatedPontuation = await pontuationService.updatePontuation(pontuation.id, pontuation.pontosAcumulados + pointsToAdd);
        setPontuationState(updatedPontuation);
      } catch (err) {
        setError('Erro ao atualizar a pontuação');
      } finally {
        setLoading(false);
      }
    }
  };

  const setNewPontuation = async (newClientPontuation: PontuationCliente) => {
    setLoading(true);
    setError(null);
    try {
      const createdPontuation = await pontuationService.setPontuation(newClientPontuation);
      setPontuationState(createdPontuation);
    } catch (err) {
      setError('Erro ao definir nova pontuação');
    } finally {
      setLoading(false);
    }
  };

  return {
    pontuation,
    loading,
    error,
    fetchPontuation,
    updatePoints,
    setNewPontuation,
  };
};
