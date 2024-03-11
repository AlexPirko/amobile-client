import { NextRouter } from 'next/router'
import { getQueryParamOnFirstRender, idGenerator } from './common'
import { getGoodsFx } from '@/app/api/goods'
import { setFilteredGoodsUnits } from '@/context/goods'

const createModeCheckboxObj = (title: string) => ({
  title,
  checked: false,
  id: idGenerator(),
})

export const goodsBrends = [
  'Apple',
  'Honor',
  'Huawei',
  'LG',
  'Poco',
  'Samsung',
  'Sony',
  'Xiaomi',
].map(createModeCheckboxObj)

export const goodsMemory = [
  '1Тб',
  '512Гб',
  '256Гб',
  '128Гб',
  '64Гб',
  '32Гб',
].map(createModeCheckboxObj)

export const goodsRam = [
  '64Гб',
  '32Гб',
  '16Гб',
  '12Гб',
  '8Гб',
  '6Гб',
  '4Гб',
].map(createModeCheckboxObj)

export const goodsCore = ['8', '6', '4', '2'].map(createModeCheckboxObj)

const checkPriceFromQuery = (price: number) =>
  price && !isNaN(price) && price >= 5000 && price <= 90000

export const checkQueryParams = (router: NextRouter) => {
  const priceFromQueryValue = getQueryParamOnFirstRender(
    'priceFrom',
    router
  ) as string
  const priceToQueryValue = getQueryParamOnFirstRender(
    'priceTo',
    router
  ) as string
  const brendQueryValue = JSON.parse(
    decodeURIComponent(
      getQueryParamOnFirstRender('goods_model', router) as string
    )
  )
  const memoryQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('memory', router) as string)
  )
  const ramQueryValue = JSON.parse(
    decodeURIComponent(getQueryParamOnFirstRender('ram', router) as string)
  )
  const coreQueryValue = JSON.parse(
    decodeURIComponent(
      getQueryParamOnFirstRender('cores_num', router) as string
    )
  )
  const isValidBrendQuery =
    Array.isArray(brendQueryValue) && !!brendQueryValue?.length
  const isValidMemoryQuery =
    Array.isArray(memoryQueryValue) && !!memoryQueryValue?.length
  const isValidRamQuery =
    Array.isArray(ramQueryValue) && !!ramQueryValue?.length
  const isValidCoreQuery =
    Array.isArray(coreQueryValue) && !!coreQueryValue?.length
  const isValidPriceQuery =
    checkPriceFromQuery(+priceFromQueryValue) &&
    checkPriceFromQuery(+priceToQueryValue)

  return {
    isValidBrendQuery,
    isValidMemoryQuery,
    isValidRamQuery,
    isValidCoreQuery,
    isValidPriceQuery,
    priceFromQueryValue,
    priceToQueryValue,
    brendQueryValue,
    memoryQueryValue,
    ramQueryValue,
    coreQueryValue,
  }
}

export const updateParamsAndFiltersFromQuery = async (
  callback: VoidFunction,
  path: string
) => {
  callback()

  const data = await getGoodsFx(`/goods?limit=8&offset=${path}`)

  setFilteredGoodsUnits(data)
}

export async function updateParamsAndFilters<T>(
  updatedParams: T,
  path: string,
  router: NextRouter
) {
  const params = router.query

  delete params.goods_model
  delete params.memory
  delete params.ram
  delete params.cores_num
  delete params.priceFrom
  delete params.priceTo

  router.push(
    {
      query: {
        ...params,
        ...updatedParams,
      },
    },
    undefined,
    { shallow: true }
  )

  const data = await getGoodsFx(`/goods?limit=8&offset=${path}`)

  setFilteredGoodsUnits(data)
}
