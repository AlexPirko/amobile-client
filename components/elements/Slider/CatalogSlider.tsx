/* eslint-disable @typescript-eslint/no-explicit-any */
import Slider from 'react-slick'
import Image from 'next/image'
import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { IDashboardSlider } from '@/types/dashboard'

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

const CatalogSlider = ({ items, spinner }: IDashboardSlider) => {
  const isMedia1366 = useMediaQuery(1366)
  const isMedia800 = useMediaQuery(800)
  const isMedia560 = useMediaQuery(560)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const width = {
    width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344,
  }
  const settings = {
    arrows: true,
    dots: false,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1248,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1040,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
          dots: true,
          infinite: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: true,
          infinite: true,
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }
  return (
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
        items.map((item, index) => (
          <div
            key={index}
            className={styles.dashboard__catalog_slider__wrapper}
          >
            <div className={styles.dashboard__catalog_slider__image_wrapper}>
              <Image
                src={item?.images}
                alt="Advertisement Banner"
                width={136}
                height={168}
                className={styles.dashboard__catalog_slider__image}
              />
            </div>
            <h3
              className={`${styles.dashboard__catalog_slider__subtitle} ${darkModeClass}`}
            >
              {item?.goods_model}
            </h3>
          </div>
        ))
      ) : (
        <span>Список товаров пуст....</span>
      )}
    </Slider>
  )
}

export default CatalogSlider
