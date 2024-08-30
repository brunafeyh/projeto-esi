import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../shared/api';
import { Prato as Dish } from '../types/dishes';
import { useCart } from './use-cart';

export const useFilteredDishes = () => {
	const [dishes, setDishes] = useState<Dish[]>([]);
	const { cart, addToCart } = useCart();
	const [searchTerm, setSearchTerm] = useState('');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
	const [selectedCategory, setSelectedCategory] = useState('');

	useEffect(() => {
		const fetchDishes = async () => {
			try {
				const response = await axios.get(`${apiBaseUrl}/pratos`);
				setDishes(response.data);
			} catch (error) {
				console.error('Erro ao buscar pratos:', error);
			}
		};

		fetchDishes();
	}, []);

	const filteredDishes = dishes
		.filter(dish => dish.nome.toLowerCase().includes(searchTerm.toLowerCase()))
		.filter(dish => selectedCategory ? dish.categoria === selectedCategory : true)
		.sort((a, b) => sortOrder === 'asc' ? a.valorReais - b.valorReais : b.valorReais - a.valorReais);

	return {
		dishes,
		cart,
		searchTerm,
		sortOrder,
		selectedCategory,
		setSearchTerm,
		setSortOrder,
		setSelectedCategory,
		addToCart,
		filteredDishes
	};
};
