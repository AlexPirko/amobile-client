/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'

import styles from '@/styles/dashboard/index.module.scss'

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

const MainSlider = () => {
  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 8000,
    cssEase: 'linear',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }
  return (
    <Slider {...settings}>
      <div className={styles.dashboard__main_slider}>
        <Image
          src="/img/slide1.jpeg"
          alt="Advertisement Banner"
          fill
          className={styles.dashboard__main_slider__image}
        />
      </div>
      <div className={styles.dashboard__main_slider}>
        <Image
          src="/img/slide1.jpeg"
          alt="Advertisement Banner"
          fill
          className={styles.dashboard__main_slider__image}
        />
      </div>
      <div className={styles.dashboard__main_slider}>
        <Image
          src="/img/slide1.jpeg"
          alt="Advertisement Banner"
          fill
          className={styles.dashboard__main_slider__image}
        />
      </div>
    </Slider>
  )
}

export default MainSlider
