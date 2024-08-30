import { useState, useMemo } from 'react';
import { useCart } from './use-cart';
import { useDishes } from './use-dishes';

export const useFilteredDishes = () => {
	const { dishes, isLoading, error } = useDishes();
	const { cartItems, addToCart } = useCart();
	const [searchTerm, setSearchTerm] = useState('');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
	const [selectedCategory, setSelectedCategory] = useState('');

	const filteredDishes = useMemo(() => {
		return dishes
			.filter(dish => dish.nome.toLowerCase().includes(searchTerm.toLowerCase()))
			.filter(dish => selectedCategory ? dish.categoria === selectedCategory : true)
			.sort((a, b) => sortOrder === 'asc' ? a.valorReais - b.valorReais : b.valorReais - a.valorReais);
	}, [dishes, searchTerm, sortOrder, selectedCategory]);

	return {
		dishes,
		cartItems,
		searchTerm,
		sortOrder,
		selectedCategory,
		setSearchTerm,
		setSortOrder,
		setSelectedCategory,
		addToCart,
		filteredDishes,
		isLoading,
		error,
	};
};
