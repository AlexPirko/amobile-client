import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'

import {
  $goodsBrends,
  setGoodsBrendsFromQuery,
  $goodsMemory,
  setGoodsMemoryFromQuery,
  $goodsRam,
  setGoodsRamFromQuery,
  $goodsCore,
  setGoodsCoreFromQuery,
} from '@/context/goods'
import { getQueryParamOnFirstRender } from '@/utils/common'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import {
  checkQueryParams,
  updateParamsAndFilters,
  updateParamsAndFiltersFromQuery,
} from '@/utils/catalog'
import { ICatalogFiltersProps } from '@/types/catalog'

type Params = {
  goods_model?: string
  offset: number
  memory?: string
  ram?: string
  cores_num?: string
  priceFrom?: number
  priceTo?: number
}

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  resetFilters,
  isPriceRangeChanged,
  currentPage,
  setIsFilterInQuery,
  filtersMobileOpen,
  closePopup,
}: ICatalogFiltersProps) => {
  const [spinner, setSpinner] = useState(false)

  const goodBrends = useStore($goodsBrends)
  const goodMemory = useStore($goodsMemory)
  const goodRam = useStore($goodsRam)
  const goodCore = useStore($goodsCore)
  const router = useRouter()

  useEffect(() => {
    applyFiltersFromQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const applyFiltersFromQuery = async () => {
    try {
      const {
        isValidBrendQuery,
        isValidMemoryQuery,
        isValidPriceQuery,
        isValidRamQuery,
        isValidCoreQuery,
        priceFromQueryValue,
        brendQueryValue,
        memoryQueryValue,
        ramQueryValue,
        coreQueryValue,
        priceToQueryValue,
      } = checkQueryParams(router)

      const brendQuery = `&goods_model=${getQueryParamOnFirstRender(
        'goods_model',
        router
      )}`
      const memQuery = `&memory=${getQueryParamOnFirstRender('memory', router)}`
      const ramQuery = `&ram=${getQueryParamOnFirstRender('ram', router)}`
      const coreQuery = `&cores_num=${getQueryParamOnFirstRender(
        'cores_num',
        router
      )}`
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (
        isValidBrendQuery &&
        isValidMemoryQuery &&
        isValidRamQuery &&
        isValidCoreQuery &&
        isValidPriceQuery
      ) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setGoodsBrendsFromQuery(brendQueryValue)
          setGoodsMemoryFromQuery(memoryQueryValue)
          setGoodsRamFromQuery(ramQueryValue)
          setGoodsCoreFromQuery(coreQueryValue)
        }, `${currentPage}${priceQuery}${brendQuery}${memQuery}${ramQuery}${coreQuery}`)
      }

      if (isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
        }, `${currentPage}${priceQuery}`)
      }

      if (
        isValidBrendQuery &&
        isValidMemoryQuery &&
        isValidRamQuery &&
        isValidCoreQuery
      ) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setGoodsBrendsFromQuery(brendQueryValue)
          setGoodsMemoryFromQuery(memoryQueryValue)
          setGoodsRamFromQuery(ramQueryValue)
          setGoodsCoreFromQuery(coreQueryValue)
        }, `${currentPage}${brendQuery}${memQuery}${ramQuery}${coreQuery}`)
      }

      if (isValidBrendQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setGoodsBrendsFromQuery(brendQueryValue)
        }, `${currentPage}${brendQuery}`)
      }

      if (isValidMemoryQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setGoodsMemoryFromQuery(memoryQueryValue)
        }, `${currentPage}${memQuery}`)
      }

      if (isValidRamQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setGoodsRamFromQuery(ramQueryValue)
        }, `${currentPage}${ramQuery}`)
      }

      if (isValidCoreQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setGoodsCoreFromQuery(coreQueryValue)
        }, `${currentPage}${coreQuery}`)
      }

      if (isValidBrendQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setGoodsBrendsFromQuery(brendQueryValue)
        }, `${currentPage}${priceQuery}${brendQuery}`)
      }

      if (isValidMemoryQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setGoodsMemoryFromQuery(memoryQueryValue)
        }, `${currentPage}${priceQuery}${memQuery}`)
      }

      if (isValidRamQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setGoodsRamFromQuery(ramQueryValue)
        }, `${currentPage}${priceQuery}${ramQuery}`)
      }

      if (isValidCoreQuery && isValidPriceQuery) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setGoodsCoreFromQuery(coreQueryValue)
        }, `${currentPage}${priceQuery}${coreQuery}`)
      }

      if (isValidBrendQuery && isValidMemoryQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setGoodsBrendsFromQuery(brendQueryValue)
          setGoodsMemoryFromQuery(memoryQueryValue)
        }, `${currentPage}${brendQuery}${memQuery}`)
        return
      }
    } catch (error) {
      const err = error as Error

      if (err.message === 'URI malformed') {
        toast.warning('Неправильный url для фильтров')
        return
      }

      toast.error(err.message)
    }
  }

  const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
    setIsFilterInQuery(true)
    setPriceRange([+priceFrom, +priceTo])
    setIsPriceRangeChanged(true)
  }

  const applyFilters = async () => {
    setIsFilterInQuery(true)
    try {
      setSpinner(true)
      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])
      const priceQuery = isPriceRangeChanged
        ? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
        : ''
      const goods_model = goodBrends
        .filter((item) => item.checked)
        .map((item) => item.title)
      const memory = goodMemory
        .filter((item) => item.checked)
        .map((item) => item.title)
      const ram = goodRam
        .filter((item) => item.checked)
        .map((item) => item.title)
      const cores_num = goodCore
        .filter((item) => item.checked)
        .map((item) => item.title)

      const encodedBrendsQuery = encodeURIComponent(JSON.stringify(goods_model))
      const encodedMemsQuery = encodeURIComponent(JSON.stringify(memory))
      const encodedRamsQuery = encodeURIComponent(JSON.stringify(ram))
      const encodedCoresQuery = encodeURIComponent(JSON.stringify(cores_num))
      const brendQuery = `&goods_model=${encodedBrendsQuery}`
      const memQuery = `&memory=${encodedMemsQuery}`
      const ramQuery = `&ram=${encodedRamsQuery}`
      const coreQuery = `&cores_num=${encodedCoresQuery}`

      const initialPage = currentPage > 0 ? 0 : currentPage

      if (goods_model.length) {
        const params: Params = {
          goods_model: encodedBrendsQuery,
          offset: initialPage + 1,
        }
        let query = `${initialPage}${brendQuery}`

        if (memory.length) {
          params.memory = encodedMemsQuery
          query += memQuery
        }

        if (ram.length) {
          params.ram = encodedRamsQuery
          query += ramQuery
        }

        if (cores_num.length) {
          params.cores_num = encodedCoresQuery
          query += coreQuery
        }

        if (isPriceRangeChanged) {
          params.priceFrom = priceFrom
          params.priceTo = priceTo
          query += priceQuery
        }

        updateParamsAndFilters(params, query, router)
      }

      if (memory.length) {
        const params: Params = {
          memory: encodedMemsQuery,
          offset: initialPage + 1,
        }
        let query = `${initialPage}${memQuery}`

        if (goods_model.length) {
          params.goods_model = encodedBrendsQuery
          query += brendQuery
        }

        if (ram.length) {
          params.ram = encodedRamsQuery
          query += ramQuery
        }

        if (cores_num.length) {
          params.cores_num = encodedCoresQuery
          query += coreQuery
        }

        if (isPriceRangeChanged) {
          params.priceFrom = priceFrom
          params.priceTo = priceTo
          query += priceQuery
        }

        updateParamsAndFilters(params, query, router)
      }

      if (ram.length) {
        const params: Params = {
          ram: encodedRamsQuery,
          offset: initialPage + 1,
        }
        let query = `${initialPage}${ramQuery}`

        if (goods_model.length) {
          params.goods_model = encodedBrendsQuery
          query += brendQuery
        }

        if (memory.length) {
          params.memory = encodedMemsQuery
          query += memQuery
        }

        if (cores_num.length) {
          params.cores_num = encodedCoresQuery
          query += coreQuery
        }

        if (isPriceRangeChanged) {
          params.priceFrom = priceFrom
          params.priceTo = priceTo
          query += priceQuery
        }

        updateParamsAndFilters(params, query, router)
      }

      if (cores_num.length) {
        const params: Params = {
          cores_num: encodedRamsQuery,
          offset: initialPage + 1,
        }
        let query = `${initialPage}${coreQuery}`

        if (goods_model.length) {
          params.goods_model = encodedBrendsQuery
          query += brendQuery
        }

        if (memory.length) {
          params.memory = encodedMemsQuery
          query += memQuery
        }

        if (ram.length) {
          params.ram = encodedRamsQuery
          query += ramQuery
        }

        if (isPriceRangeChanged) {
          params.priceFrom = priceFrom
          params.priceTo = priceTo
          query += priceQuery
        }

        updateParamsAndFilters(params, query, router)
      }

      if (isPriceRangeChanged) {
        const params: Params = {
          priceFrom,
          priceTo,
          offset: initialPage + 1,
        }
        let query = `${initialPage}${priceQuery}`

        if (goods_model.length) {
          params.goods_model = encodedBrendsQuery
          query += brendQuery
        }

        if (memory.length) {
          params.memory = encodedMemsQuery
          query += memQuery
        }

        if (ram.length) {
          params.ram = encodedRamsQuery
          query += ramQuery
        }

        if (cores_num.length) {
          params.cores_num = encodedCoresQuery
          query += coreQuery
        }

        updateParamsAndFilters(params, query, router)
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <CatalogFiltersDesktop
      priceRange={priceRange}
      setPriceRange={setPriceRange}
      setIsPriceRangeChanged={setIsPriceRangeChanged}
      resetFilterBtnDisabled={resetFilterBtnDisabled}
      spinner={spinner}
      resetFilters={resetFilters}
      applyFilters={applyFilters}
      filtersMobileOpen={filtersMobileOpen}
      closePopup={closePopup}
    />
  )
}

export default CatalogFilters
