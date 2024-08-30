import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiBaseUrl } from '../shared/api';

export interface Prato {
	id: number;
	nome: string;
	descricao: string;
	valorReais: number;
	valorPontos: number;
	categoria: string;
	img: string;
}

export interface CartItem extends Prato {
	quantidade: number;
	valorTotal: number;
}

export const useFilteredPratos = () => {
	const [pratos, setPratos] = useState<Prato[]>([]);
	const [carrinho, setCarrinho] = useState<CartItem[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
	const [selectedCategory, setSelectedCategory] = useState('');

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
				const response = await axios.post(`${apiBaseUrl}/carrinho`, {
					id: prato.id,
					nome: prato.nome,
					quantidade: 1,
					valorTotal: prato.valorReais,
					valorReais: prato.valorReais,
				});
				setCarrinho((prevCarrinho) => [...prevCarrinho, response.data]);
			}
			toast.success('Prato adicionado ao carrinho com sucesso!');
		} catch (error) {
			console.error('Erro ao adicionar ao carrinho:', error);
			toast.error('Erro ao adicionar ao carrinho.');
		}
	};

	const filteredPratos = pratos
		.filter(prato => prato.nome.toLowerCase().includes(searchTerm.toLowerCase()))
		.filter(prato => selectedCategory ? prato.categoria === selectedCategory : true)
		.sort((a, b) => sortOrder === 'asc' ? a.valorReais - b.valorReais : b.valorReais - a.valorReais);

	return {
		pratos,
		carrinho,
		searchTerm,
		sortOrder,
		selectedCategory,
		setSearchTerm,
		setSortOrder,
		setSelectedCategory,
		adicionarAoCarrinho,
		filteredPratos
	};
};
