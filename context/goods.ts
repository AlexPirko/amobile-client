import { IGoodsUnits } from '@/types/goods-model'
import { IFilterCheckboxItem } from '@/types/catalog'
import { goodsBrends, goodsMemory, goodsRam, goodsCore } from '@/utils/catalog'
import { createDomain } from 'effector-next'

const goodsUnits = createDomain()

export const setGoodsUnits = goodsUnits.createEvent<IGoodsUnits>()
export const setGoodsUnitsCheapFirst = goodsUnits.createEvent()
export const setGoodsUnitsExpensiveFirst = goodsUnits.createEvent()
export const setGoodsUnitsByPopularity = goodsUnits.createEvent()
export const setFilteredGoodsUnits = goodsUnits.createEvent()

export const setGoodsBrends = goodsUnits.createEvent<IFilterCheckboxItem[]>()
export const updateGoodsBrends = goodsUnits.createEvent<IFilterCheckboxItem>()
export const setGoodsBrendsFromQuery = goodsUnits.createEvent<string[]>()

export const setGoodsMemory = goodsUnits.createEvent<IFilterCheckboxItem[]>()
export const updateGoodsMemory = goodsUnits.createEvent<IFilterCheckboxItem>()
export const setGoodsMemoryFromQuery = goodsUnits.createEvent<string[]>()

export const setGoodsRam = goodsUnits.createEvent<IFilterCheckboxItem[]>()
export const updateGoodsRam = goodsUnits.createEvent<IFilterCheckboxItem>()
export const setGoodsRamFromQuery = goodsUnits.createEvent<string[]>()

export const setGoodsCore = goodsUnits.createEvent<IFilterCheckboxItem[]>()
export const updateGoodsCore = goodsUnits.createEvent<IFilterCheckboxItem>()
export const setGoodsCoreFromQuery = goodsUnits.createEvent<string[]>()

const updateGoods = (
  goods_mode: IFilterCheckboxItem[],
  id: string,
  payload: Partial<IFilterCheckboxItem>
) =>
  goods_mode.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...payload,
      }
    }

    return item
  })

const updateGoodsFromQuery = (
  goods_mode: IFilterCheckboxItem[],
  goodsFromQuery: string[]
) =>
  goods_mode.map((item) => {
    if (goodsFromQuery.find((title) => title === item.title)) {
      return {
        ...item,
        checked: true,
      }
    }

    return item
  })

export const $goodsUnits = goodsUnits
  .createStore<IGoodsUnits>({} as IGoodsUnits)
  .on(setGoodsUnits, (_, parts) => parts)
  .on(setGoodsUnitsCheapFirst, (state) => ({
    ...state,
    rows: state.rows.sort(
      (a, b) =>
        (a.price * (100 - a.discount)) / 100 -
        (b.price * (100 - b.discount)) / 100
    ),
  }))
  .on(setGoodsUnitsExpensiveFirst, (state) => ({
    ...state,
    rows: state.rows.sort(
      (a, b) =>
        (b.price * (100 - b.discount)) / 100 -
        (a.price * (100 - a.discount)) / 100
    ),
  }))
  .on(setGoodsUnitsByPopularity, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.popularity - a.popularity),
  }))

export const $goodsBrends = goodsUnits
  .createStore<IFilterCheckboxItem[]>(goodsBrends as IFilterCheckboxItem[])
  .on(setGoodsBrends, (_, parts) => parts)
  .on(updateGoodsBrends, (state, payload) => [
    ...updateGoods(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setGoodsBrendsFromQuery, (state, goodsFromQuery) => [
    ...updateGoodsFromQuery(state, goodsFromQuery),
  ])

export const $goodsMemory = goodsUnits
  .createStore<IFilterCheckboxItem[]>(goodsMemory as IFilterCheckboxItem[])
  .on(setGoodsMemory, (_, parts) => parts)
  .on(updateGoodsMemory, (state, payload) => [
    ...updateGoods(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setGoodsMemoryFromQuery, (state, goodsFromQuery) => [
    ...updateGoodsFromQuery(state, goodsFromQuery),
  ])

export const $goodsRam = goodsUnits
  .createStore<IFilterCheckboxItem[]>(goodsRam as IFilterCheckboxItem[])
  .on(setGoodsRam, (_, parts) => parts)
  .on(updateGoodsRam, (state, payload) => [
    ...updateGoods(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setGoodsRamFromQuery, (state, goodsFromQuery) => [
    ...updateGoodsFromQuery(state, goodsFromQuery),
  ])

export const $goodsCore = goodsUnits
  .createStore<IFilterCheckboxItem[]>(goodsCore as IFilterCheckboxItem[])
  .on(setGoodsCore, (_, parts) => parts)
  .on(updateGoodsCore, (state, payload) => [
    ...updateGoods(state, payload.id as string, {
      checked: payload.checked,
    }),
  ])
  .on(setGoodsCoreFromQuery, (state, goodsFromQuery) => [
    ...updateGoodsFromQuery(state, goodsFromQuery),
  ])

export const $filteredGoodsUnits = goodsUnits
  .createStore<IGoodsUnits>({} as IGoodsUnits)
  .on(setFilteredGoodsUnits, (_, parts) => parts)
