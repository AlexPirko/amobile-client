import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import Accordion from '@/components/elements/Accordion/Accordion'
import FilterCheckboxItem from './FilterCheckboxItem'

import { IFilterModeAccordionProps } from '@/types/catalog'

import styles from '@/styles/catalog/index.module.scss'

const FilterModeAccordion = ({
  modesList,
  title,
  updateMode,
  setMode,
}: IFilterModeAccordionProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const chooseAllModes = () =>
    setMode(modesList.map((item) => ({ ...item, checked: true })))

  return (
    <div className={styles.filters__char__inner}>
      <button
        className={`${styles.filters__char__select_all} ${darkModeClass}`}
        onClick={chooseAllModes}
      >
        Выбрать все
      </button>
      <ul className={styles.filters__char__list}>
        {modesList.slice(0, 2).map((item) => (
          <FilterCheckboxItem
            title={item.title}
            id={item.id}
            key={item.id}
            checked={item.checked}
            event={updateMode}
          />
        ))}
      </ul>
      <Accordion
        title={title}
        titleClass={`${styles.filters__char__btn} ${darkModeClass}`}
        arrowOpenClass={styles.open}
      >
        <ul className={styles.filters__char__list}>
          {modesList.slice(2).map((item) => (
            <FilterCheckboxItem
              title={item.title}
              id={item.id}
              key={item.id}
              checked={item.checked}
              event={updateMode}
            />
          ))}
        </ul>
      </Accordion>
    </div>
  )
}

export default FilterModeAccordion
