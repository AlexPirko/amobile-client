import { createEffect } from 'effector-next'
import api from '../axiosClient'
import { IMakePayFx } from '@/types/order'

export const makePaymentFx = createEffect(
  async ({ url, amount, description }: IMakePayFx) => {
    const { data } = await api.post(url, { amount, description })

    return data
  }
)
