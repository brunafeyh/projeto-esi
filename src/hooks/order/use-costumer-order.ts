import { useEffect, useState } from 'react'
import { useOrders } from './use-orders'
import { useAuth } from '../use-auth'
import { Pedido } from '../../types/order'

export const useCustomerOrders = () => {
  const { orders } = useOrders()
  const { user } = useAuth()
  const [customerOrders, setCustomerOrders] = useState<Pedido[]>([])

  useEffect(() => {
    if (user && orders) {
      const filteredOrders = orders.filter(order => order.cpf === user.cpf)
      setCustomerOrders(filteredOrders)
    }
  }, [orders, user])

  return {
    customerOrders,
    setCustomerOrders,
  }
}