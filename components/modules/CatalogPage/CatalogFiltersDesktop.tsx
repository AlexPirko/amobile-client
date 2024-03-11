import { useStore } from 'effector-react'

import {
  $goodsBrends,
  setGoodsBrends,
  updateGoodsBrends,
  $goodsMemory,
  updateGoodsMemory,
  setGoodsMemory,
  $goodsRam,
  updateGoodsRam,
  setGoodsRam,
  $goodsCore,
  updateGoodsCore,
  setGoodsCore,
} from '@/context/goods'
import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import FilterModeAccordion from './FilterModeAccordion'
import PriceRange from './PriceRange'
import { ICatalogFilterDesktopProps } from '@/types/catalog'
import CloseSvg from '@/components/elements/svg/CloseSvg/CloseSvg'

import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/catalog/index.module.scss'

const CatalogFiltersDesktop = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterBtnDisabled,
  spinner,
  resetFilters,
  applyFilters,
  filtersMobileOpen,
  closePopup,
}: ICatalogFilterDesktopProps) => {
  const mode = useStore($mode)
  const isMobile = useMediaQuery(820)

  const goodBrends = useStore($goodsBrends)
  const goodsMemory = useStore($goodsMemory)
  const goodsRam = useStore($goodsRam)
  const goodsCore = useStore($goodsCore)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div
      className={`${styles.filters} ${darkModeClass} ${
        filtersMobileOpen ? styles.open : ''
      }`}
    >
      {isMobile && (
        <button
          className={`${styles.filters__close_icon} ${darkModeClass}`}
          onClick={closePopup}
        >
          <CloseSvg />
        </button>
      )}
      <div className={styles.filters__price}>
        <h4 className={`${styles.filters__price__title} ${darkModeClass}`}>
          Цена, ₴
        </h4>
        <div className={styles.filters__price__inner}>
          <PriceRange
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            setIsPriceRangeChanged={setIsPriceRangeChanged}
          />
        </div>
      </div>

      <div className={styles.filters__char}>
        <h4 className={`${styles.filters__char__title} ${darkModeClass}`}>
          Бренд
        </h4>
        <FilterModeAccordion
          modesList={goodBrends}
          title="Еще"
          updateMode={updateGoodsBrends}
          setMode={setGoodsBrends}
        />
      </div>

      <div className={styles.filters__char}>
        <h4 className={`${styles.filters__char__title} ${darkModeClass}`}>
          Встроенная память
        </h4>
        <FilterModeAccordion
          modesList={goodsMemory}
          title="Еще"
          updateMode={updateGoodsMemory}
          setMode={setGoodsMemory}
        />
      </div>

      <div className={styles.filters__char}>
        <h4 className={`${styles.filters__char__title} ${darkModeClass}`}>
          Оперативная память
        </h4>
        <FilterModeAccordion
          modesList={goodsRam}
          title="Еще"
          updateMode={updateGoodsRam}
          setMode={setGoodsRam}
        />
      </div>

      <div className={styles.filters__char}>
        <h4 className={`${styles.filters__char__title} ${darkModeClass}`}>
          Количество ядер
        </h4>
        <FilterModeAccordion
          modesList={goodsCore}
          title="Еще"
          updateMode={updateGoodsCore}
          setMode={setGoodsCore}
        />
      </div>

      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          disabled={spinner || resetFilterBtnDisabled}
          onClick={applyFilters}
        >
          {spinner ? (
            <span
              className={spinnerStyles.spinner}
              style={{ top: 6, left: '47%' }}
            />
          ) : (
            'Применить'
          )}
        </button>
        <button
          className={styles.filters__actions__reset}
          disabled={resetFilterBtnDisabled}
          onClick={resetFilters}
        >
          Сбросить
        </button>
      </div>
    </div>
  )
}

export default CatalogFiltersDesktop
