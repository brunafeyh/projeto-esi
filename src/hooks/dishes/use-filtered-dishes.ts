import { useState, useMemo, useEffect } from 'react';
import { useCart } from '../use-cart';
import { useQueryParams } from '../params/query-params';
import { useDishes } from './use-dishes';

export const useFilteredDishes = () => {
	const { dishes, isLoading, error } = useDishes();
	const { cartItems, addToCart } = useCart();
	const { getQueryParam, setQueryParam } = useQueryParams();

	const [searchTerm, setSearchTerm] = useState<string>(getQueryParam('searchTerm', ''));
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(getQueryParam<'asc' | 'desc'>('sortOrder', 'asc'));
	const [selectedCategory, setSelectedCategory] = useState<string>(getQueryParam('category', ''));

	useEffect(() => {
		setQueryParam('searchTerm', searchTerm);
		setQueryParam('sortOrder', sortOrder);
		setQueryParam('category', selectedCategory);
	}, [searchTerm, sortOrder, selectedCategory, setQueryParam]);

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
