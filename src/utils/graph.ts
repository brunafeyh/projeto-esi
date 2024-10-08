import { Prato } from "../types/dishes";
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


export const mapDishesToCategories = (dishes: Prato[]): { [key: string]: string } => {
  return dishes.reduce((map: { [key: string]: string }, dish: Prato) => {
    map[dish.id] = dish.categoria;
    return map;
  }, {});
};

export const countCategories = (orders: Pedido[], dishesMap: { [key: string]: string }): { [key: string]: number } => {
  const categoryCount: { [key: string]: number } = {};

  orders.forEach((order: Pedido) => {
    order.pratos.forEach((prato) => {
      const category = dishesMap[prato.id];
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