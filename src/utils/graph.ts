import { useDishes } from "../hooks/dishes/use-dishes";
import { useOrders } from "../hooks/order/use-orders";
import { DishValueForm } from "../types/dishes";
import { DishSale, SalesPerDish } from "../types/graphs";
import { Pedido } from "../types/order";

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDateString = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

export const filterOrdersByDate = (orders: Pedido[], selectedDate: Date | null): Pedido[] => {
  return selectedDate ? orders.filter((order) => order.data === formatDate(selectedDate)) : orders;
}

export const calculateTotalClients = (orders: Pedido[]): number => {
  return new Set(orders.map((order) => order.cpf)).size;
}

export const calculateTotalOrders = (orders: Pedido[]): number => {
  return orders.length;
}

export const calculateTotalProfit = (orders: Pedido[]): number => {
  return orders.reduce((sum, order) => sum + order.valorTotal, 0);
}


export const mapDishesToCategories = (dishes: DishValueForm[]): { [key: string]: string } => {
  return dishes.reduce((map: { [key: string]: string }, dish: DishValueForm) => {
    map[dish.id] = String(dish.categoryId);
    return map;
  }, {});
};

export const countCategories = (orders: Pedido[], dishesMap: { [key: string]: string }): { [key: string]: number } => {
  const categoryCount: { [key: string]: number } = {};

  orders.forEach((order: Pedido) => {
    order.pratos.forEach((prato) => {
      const category = dishesMap[prato.prato.id];
      if (category) {
        categoryCount[category] = (categoryCount[category] || 0) + prato.quantidade;
      }
    });
  });

  return categoryCount;
};

export const initializeMonthlySales = (): number[] => Array(12).fill(0);

export const calculateMonthlySales = (orders: Pedido[], selectedYear: number): number[] => {
  const vendasPorMes = initializeMonthlySales();

  orders.forEach((order) => {
    const date = new Date(order.data);
    if (date.getFullYear() === selectedYear) {
      const monthIndex = date.getMonth();
      vendasPorMes[monthIndex] += order.valorTotal;
    }
  });

  return vendasPorMes;
};


export const calculateTopDishes = (orders: any[]): DishSale[] => {
  const sales: SalesPerDish = {};

  orders.forEach((order) => {
    order.pratos.forEach((orderedDish: any) => {
      const dishId = Number(orderedDish.id);

      if (sales[dishId]) {
        sales[dishId].quantity += orderedDish.quantidade;
      } else {
        sales[dishId] = {
          name: orderedDish.nome,
          quantity: orderedDish.quantidade,
        };
      }
    });
  });

  return Object.values(sales)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);
};

export const getMoreSelled = () => {
  const { orders } = useOrders()
  const { dishes } = useDishes()
  const dishCountMap = new Map()

  orders.forEach(order => {
    order.pratos.forEach(prato => {
      if (dishCountMap.has(prato.prato.id)) {
        const existingDish = dishCountMap.get(prato.prato.id);
        dishCountMap.set(prato.prato.id, {
          ...existingDish,
          quantidade: existingDish.quantidade + prato.quantidade,
        });
      } else {
        dishCountMap.set(prato.prato.id, {
          ...prato,
        });
      }
    });
  });
  const sortedDishes = Array.from(dishCountMap.values()).sort((a, b) => b.quantidade - a.quantidade);
  const top5Dishes = sortedDishes.slice(0, 5);
  const top5DishDetails = top5Dishes.map(topDish => {
    const fullDish = dishes.find(dish => dish.id === topDish.id);
    return fullDish ? { ...fullDish, quantidade: topDish.quantidade } : topDish;
  });

  return top5DishDetails;
};
