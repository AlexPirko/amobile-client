import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import { removeItemFromCart, updateTotalPrice } from '@/utils/shopping-cart'

export const usePrice = (
  count: number,
  partId: number,
  initialPrice: number
) => {
  const spinner = useStore(removeFromCartFx.pending)
  const [price, setPrice] = useState(initialPrice)

  useEffect(() => {
    setPrice(price * count)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    updateTotalPrice(price, partId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price])

  const increasePrice = () => setPrice(price + initialPrice)
  const decreasePrice = () => setPrice(price - initialPrice)
  const deleteCartItem = () => removeItemFromCart(partId)

  return { price, spinner, increasePrice, decreasePrice, deleteCartItem }
}
