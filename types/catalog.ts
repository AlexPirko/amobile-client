import { Event } from 'effector-next'

export interface IQueryParams {
  offset: string
  firs: string
  goods: string
  priceFrom: string
  priceTo: string
  partId: string
}

export interface IBrendsBlockItemProps {
  item: IFilterCheckboxItem
  event: Event<IFilterCheckboxItem>
}

export interface IFilterCheckboxItem {
  title: string
  checked: boolean
  id?: string
  event: Event<IFilterCheckboxItem>
}

interface ICatalogBaseTypes {
  priceRange: number[]
  setPriceRange: (arg0: number[]) => void
  setIsPriceRangeChanged: (arg0: boolean) => void
}

interface ICatalogFiltersBaseTypes {
  resetFilterBtnDisabled: boolean
  resetFilters: VoidFunction
}

export interface ICatalogFiltersProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  isPriceRangeChanged: boolean
  currentPage: number
  setIsFilterInQuery: (arg0: boolean) => void
  closePopup?: VoidFunction
  filtersMobileOpen?: boolean
}

export type IPriceRangeProps = ICatalogBaseTypes

export interface ICatalogFilterDesktopProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  spinner: boolean
  applyFilters: VoidFunction
  filtersMobileOpen?: boolean
  closePopup?: VoidFunction
}

export interface IFilterModeAccordionProps {
  modesList: IFilterCheckboxItem[]
  title: string | false
  setMode: Event<IFilterCheckboxItem[]>
  updateMode: Event<IFilterCheckboxItem>
}
