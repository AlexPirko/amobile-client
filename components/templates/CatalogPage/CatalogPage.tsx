import { useStore } from 'effector-react'
import ReactPaginate from 'react-paginate'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { getGoodsFx } from '@/app/api/goods'
import {
  $goodsBrends,
  $goodsMemory,
  $goodsRam,
  $goodsCore,
  $filteredGoodsUnits,
  setGoodsUnits,
  setGoodsBrends,
  setGoodsMemory,
  setGoodsRam,
  setGoodsCore,
  $goodsUnits,
} from '@/context/goods'
import { $mode } from '@/context/mode'
import CatalogItem from '@/components/elements/CatalogItem/CatalogItem'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters'
import CatalogListItem from '@/components/elements/CatalogListItem/CatalogListItem'
import { checkQueryParams } from '@/utils/catalog'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePopup } from '@/hooks/usePopup'

import CatalogSvg from '@/components/elements/svg/CatalogSvg/CatalogSvg'
import TableSvg from '@/components/elements/svg/TableSvg/TableSvg'
import BackArrowSvg from '@/components/elements/svg/BackArrowSvg/BackArrowSvg'
import FilterSvg from '@/components/elements/svg/FilterSvg/FilterSvg'
import FilterMobSvg from '@/components/elements/svg/FilterMobSvg/FilterMobSvg'
import { IQueryParams } from '@/types/catalog'
import { IGoodsUnit, IGoodsUnits } from '@/types/goods-model'

import skeletonStyles from '@/styles/skeleton/index.module.scss'
import styles from '@/styles/catalog/index.module.scss'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isMobile = useMediaQuery(820)

  const goodsBrend = useStore($goodsBrends)
  const goodMemory = useStore($goodsMemory)
  const goodRam = useStore($goodsRam)
  const goodCore = useStore($goodsCore)

  const filteredGoodsUnits = useStore($filteredGoodsUnits)
  const goods = useStore($goodsUnits)

  const [activeState, setActiveState] = useState('table')
  const [spinner, setSpinner] = useState(false)
  const [priceRange, setPriceRange] = useState([5000, 90000])
  const [isFilterInQuery, setIsFilterInQuery] = useState(false)
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)

  const pagesCount = Math.ceil(goods.count / 8)
  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  )

  const router = useRouter()
  const isAnyChecked =
    goodsBrend.some((item) => item.checked) ||
    goodMemory.some((item) => item.checked) ||
    goodRam.some((item) => item.checked) ||
    goodCore.some((item) => item.checked)
  const resetFilterBtnDisabled = !(isPriceRangeChanged || isAnyChecked)
  const { toggleOpen, open, closePopup } = usePopup()

  useEffect(() => {
    loadGoodsUnits()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredGoodsUnits, isFilterInQuery])

  const isMounted = useRef(true)

  useEffect(
    () => () => {
      isMounted.current = false
    },
    []
  )

  const loadGoodsUnits = async () => {
    try {
      setSpinner(true)
      const data = await getGoodsFx('/goods?limit=8&offset=0')

      if (!isValidOffset && isMounted.current) {
        router.replace({
          query: {
            offset: 1,
          },
        })

        resetPagination(data)
        return
      }

      if (isValidOffset) {
        if (+query.offset > Math.ceil(data.count / 8)) {
          router.push(
            {
              query: {
                ...query,
                offset: 1,
              },
            },
            undefined,
            { shallow: true }
          )

          setCurrentPage(0)
          setGoodsUnits(isFilterInQuery ? filteredGoodsUnits : data)
          return
        }

        const offset = +query.offset - 1
        const result = await getGoodsFx(`/goods?limit=8&offset=${offset}`)

        setCurrentPage(offset)
        setGoodsUnits(isFilterInQuery ? filteredGoodsUnits : result)
        return
      }

      setCurrentPage(0)
      setGoodsUnits(isFilterInQuery ? filteredGoodsUnits : data)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetPagination = (data: IGoodsUnits) => {
    setCurrentPage(0)
    setGoodsUnits(data)
  }

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      setSpinner(true)
      const data = await getGoodsFx('/goods?limit=8&offset=0')

      if (selected > pagesCount) {
        resetPagination(isFilterInQuery ? filteredGoodsUnits : data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(isFilterInQuery ? filteredGoodsUnits : data)
        return
      }

      const {
        isValidBrendQuery,
        isValidMemoryQuery,
        isValidRamQuery,
        isValidCoreQuery,
        isValidPriceQuery,
      } = checkQueryParams(router)

      const result = await getGoodsFx(
        `/goods?limit=8&offset=${selected}${
          isFilterInQuery && isValidBrendQuery
            ? `&goods_model=${router.query.goods_model}`
            : ''
        }${
          isFilterInQuery && isValidMemoryQuery
            ? `&memory=${router.query.memory}`
            : ''
        }${
          isFilterInQuery && isValidRamQuery ? `&ram=${router.query.ram}` : ''
        }${
          isFilterInQuery && isValidCoreQuery
            ? `&cores_num=${router.query.core}`
            : ''
        }${
          isFilterInQuery && isValidPriceQuery
            ? `&priceFrom=${router.query.priceFrom}&priceTo=${router.query.priceTo}`
            : ''
        }`
      )

      router.push(
        {
          query: {
            ...router.query,
            offset: selected + 1,
          },
        },
        undefined,
        { shallow: true }
      )

      setCurrentPage(selected)
      setGoodsUnits(result)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinner(false), 1000)
    }
  }

  const resetFilters = async () => {
    try {
      const data = await getGoodsFx('/goods?limit=8&offset=0')
      const params = router.query

      delete params.goods_model
      delete params.memory
      delete params.ram
      delete params.core
      delete params.priceFrom
      delete params.priceTo
      params.first = 'popular'

      router.push({ query: { ...params } }, undefined, { shallow: true })

      setGoodsBrends(goodsBrend.map((item) => ({ ...item, checked: false })))
      setGoodsMemory(goodMemory.map((item) => ({ ...item, checked: false })))
      setGoodsRam(goodRam.map((item) => ({ ...item, checked: false })))
      setGoodsCore(goodCore.map((item) => ({ ...item, checked: false })))

      setGoodsUnits(data)
      setPriceRange([5000, 90000])
      setIsPriceRangeChanged(false)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <Link
          href="/"
          className={`${styles.catalog__title_wrapper} ${darkModeClass}`}
        >
          <BackArrowSvg />
          <h2
            className={`${styles.catalog__title_wrapper__title} ${darkModeClass}`}
          >
            Каталог
          </h2>
        </Link>

        <div className={styles.catalog__mode}>
          <div
            className={`${styles.catalog__mode__filter_select} ${darkModeClass}`}
          >
            <FilterSvg />
            <FilterSelect setSpinner={setSpinner} />
          </div>
          {isMobile ? (
            <button
              className={`${styles.catalog__mode__icon_wrapper__btn} ${darkModeClass}`}
              onClick={toggleOpen}
            >
              <FilterMobSvg />
              <span
                className={`${styles.catalog__mode__icon_wrapper__btn__title} ${darkModeClass}`}
              >
                Фильтры
              </span>
            </button>
          ) : (
            <div className={styles.catalog__mode__icon_wrapper}>
              <button
                className={`active ${styles.catalog__mode__icon_wrapper__btn} ${darkModeClass}`}
                onClick={() => setActiveState('table')}
              >
                <TableSvg />
              </button>
              <button
                className={`${styles.catalog__mode__icon_wrapper__btn} ${darkModeClass}`}
                onClick={() => setActiveState('list')}
              >
                <CatalogSvg />
              </button>
            </div>
          )}
        </div>

        <div className={styles.catalog__bottom}>
          <div className={styles.catalog__bottom__inner}>
            <CatalogFilters
              priceRange={priceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              setPriceRange={setPriceRange}
              resetFilterBtnDisabled={resetFilterBtnDisabled}
              resetFilters={resetFilters}
              isPriceRangeChanged={isPriceRangeChanged}
              currentPage={currentPage}
              setIsFilterInQuery={setIsFilterInQuery}
              filtersMobileOpen={open}
              closePopup={closePopup}
            />
            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(8)).map((_, i) => (
                  <li
                    key={i}
                    className={`${skeletonStyles.skeleton__item} ${
                      mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                    }`}
                  >
                    <div className={skeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul
                className={
                  activeState === 'table'
                    ? styles.catalog__table
                    : styles.catalog__list
                }
              >
                {goods.rows?.length ? (
                  goods.rows.map((item: IGoodsUnit) =>
                    isMobile ? (
                      <CatalogListItem {...item} key={item?.id} />
                    ) : activeState === 'table' ? (
                      <CatalogItem {...item} key={item?.id} />
                    ) : (
                      <CatalogListItem {...item} key={item?.id} />
                    )
                  )
                ) : (
                  <span>Список товаров пуст...</span>
                )}
              </ul>
            )}
          </div>
          <ReactPaginate
            containerClassName={styles.catalog__paginate__list}
            pageClassName={styles.catalog__paginate__list__item}
            pageLinkClassName={styles.catalog__paginate__list__item__link}
            previousClassName={styles.catalog__paginate__list__prev}
            nextClassName={styles.catalog__paginate__list__next}
            breakClassName={styles.catalog__paginate__list__break}
            breakLinkClassName={`${styles.catalog__paginate__list__break__link} ${darkModeClass}`}
            breakLabel="..."
            pageCount={pagesCount}
            forcePage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default CatalogPage
