/* eslint-disable indent */
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Select from 'react-select'

import { $mode } from '@/context/mode'
import { createSelectOption } from '@/utils/common'
import { categoriesOptions } from '@/utils/selectContents'
import {
  $goodsUnits,
  setGoodsUnitsByPopularity,
  setGoodsUnitsCheapFirst,
  setGoodsUnitsExpensiveFirst,
} from '@/context/goods'
import { IOption, SelectOptionType } from '@/types/common'

import { IGoodsUnits } from '@/types/goods-model'
import { optionStyles } from '@/styles/searchInput'
import {
  controlStyles,
  menuStyles,
  selectStyles,
} from '@/styles/catalog/select'

const FilterSelect = ({
  setSpinner,
}: {
  setSpinner: (arg0: boolean) => void
}) => {
  const mode = useStore($mode)
  const goodsUnits: IGoodsUnits = useStore($goodsUnits)
  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)
  const router = useRouter()

  useEffect(() => {
    if (goodsUnits.rows) {
      switch (router.query.first) {
        case 'popular':
          updateCategoryOption('По популярности')
          setGoodsUnitsByPopularity()
          break
        case 'cheap':
          updateCategoryOption('Сначала дешевые')
          setGoodsUnitsCheapFirst()
          break
        case 'expensive':
          updateCategoryOption('Сначала дорогие')
          setGoodsUnitsExpensiveFirst()
          break
        default:
          updateCategoryOption('По популярности')
          setGoodsUnitsByPopularity()
          break
      }
    }
  }, [goodsUnits.rows, router.query.first])

  const updateCategoryOption = (value: string) =>
    setCategoryOption({ value, label: value })

  const updateRoteParam = (first: string) =>
    router.push(
      {
        query: {
          ...router.query,
          first,
        },
      },
      undefined,
      { shallow: true }
    )

  const handleSortOptionChange = (selectedOption: SelectOptionType) => {
    setSpinner(true)
    setCategoryOption(selectedOption)

    switch ((selectedOption as IOption).value) {
      case 'По популярности':
        setGoodsUnitsByPopularity()
        updateRoteParam('popular')
        break
      case 'Сначала дешевые':
        setGoodsUnitsCheapFirst()
        updateRoteParam('cheap')
        break
      case 'Сначала дорогие':
        setGoodsUnitsExpensiveFirst()
        updateRoteParam('expensive')
        break
    }

    setTimeout(() => setSpinner(false), 1000)
  }

  return (
    <Select
      value={categoryOption || createSelectOption('По популярности')}
      onChange={handleSortOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f6f6f6' : '#222222',
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        }),
      }}
      isSearchable={false}
      options={categoriesOptions}
    />
  )
}

export default FilterSelect
