import { useCategories } from "./use-categorys";

export const useCategoryByIdFromList = (id: number | null) => {
    const { categories, isLoading, error } = useCategories();
    const category = categories.find((cat) => cat.id === id) || null;

    return {
        category,
        isLoading,
        error,
    };
};
