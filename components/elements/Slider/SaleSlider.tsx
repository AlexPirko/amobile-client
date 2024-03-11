/* eslint-disable @typescript-eslint/no-explicit-any */
import Slider from 'react-slick'

import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { IDashboardSlider } from '@/types/dashboard'
import CatalogItem from '../CatalogItem/CatalogItem'

import styles from '@/styles/dashboard/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        zIndex: '100',
      }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
        zIndex: '100',
      }}
      onClick={onClick}
    />
  )
}

const SaleSlider = ({ items, spinner }: IDashboardSlider) => {
  const isMedia1366 = useMediaQuery(1366)
  const isMedia800 = useMediaQuery(800)
  const isMedia560 = useMediaQuery(560)
  const mode = useStore($mode)

  const width = {
    width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344,
  }

  const settings = {
    arrows: true,
    dots: false,
    centerMode: true,
    infinite: true,
    centerPadding: '80px',
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1248,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1040,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerPadding: '60px',
        },
      },
      {
        breakpoint: 478,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '80px',
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }
  return (
    <div className={styles.dashboard__sale_slider}>
      <Slider {...settings}>
        {spinner ? (
          [...Array(8)].map((_, i) => (
            <div
              className={`${skeletonStyles.skeleton__item} ${
                mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
              }`}
              key={i}
              style={width}
            >
              <div className={skeletonStyles.skeleton__item__light} />
            </div>
          ))
        ) : items.length ? (
          items.map((item) => <CatalogItem {...item} key={item?.id} />)
        ) : (
          <span>Список товаров пуст....</span>
        )}
      </Slider>
    </div>
  )
}

export default SaleSlider
