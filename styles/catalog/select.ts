/* eslint-disable prettier/prettier */
import { StylesConfig, GroupBase, CSSObjectWithLabel } from 'react-select'
import { IOption } from '../../types/common'

export const controlStyles = (
  defaultStyles: CSSObjectWithLabel,
  theme: string
) => ({
  ...defaultStyles,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  width: '165px',
  height: '19px',
  border: 'none',
  boxShadow: 'none',
  fontSize: '16px',
  '& .css-1dimb5e-singleValue': {
    color: theme === 'dark' ? '#f2f2f2' : '#454545',
  },
  '@media (max-width: 820px)': {
    width: '200px',
  },
  '@media (max-width: 560px)': {
    width: '177px',
  },
})

export const menuStyles = (
  defaultStyles: CSSObjectWithLabel,
  theme: string
) => ({
  ...defaultStyles,
  boxShadow: '0 4px 20px rgb(0 0 0 / 7%)',
  height: 'auto',
  overflow: 'hidden',
  backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f2f2f2',
})

export const selectStyles: StylesConfig<
  IOption,
  boolean,
  GroupBase<IOption>
> = {
  indicatorSeparator: () => ({
    border: 'none',
  }),
  dropdownIndicator: (defaultStyles) => ({
    ...defaultStyles,
    display: 'none',
  }),
  menuList: (defaultStyles) => ({
    ...defaultStyles,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: '#b9babb',
  }),
}
