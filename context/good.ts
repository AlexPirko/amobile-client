import { IGoodsUnit } from '@/types/goods-model'
import { createDomain } from 'effector-next'

const goodUnit = createDomain()

export const setGoodUnit = goodUnit.createEvent<IGoodsUnit>()

export const $goodUnit = goodUnit
  .createStore<IGoodsUnit>({} as IGoodsUnit)
  .on(setGoodUnit, (_, part) => part)
