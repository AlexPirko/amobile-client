/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import Link from 'next/link'

import { $goodUnit } from '@/context/good'
import { $mode } from '@/context/mode'
import { $shoppingCart } from '@/context/shopping-cart'
import { toggleCartItem } from '@/utils/shopping-cart'
import { $user } from '@/context/user'
import { getGoodsFx } from '@/app/api/goods'
import {
  $goodsUnits,
  setGoodsUnits,
  setGoodsUnitsByPopularity,
} from '@/context/goods'
import SaleSlider from '@/components/elements/Slider/SaleSlider'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import BackArrowSvg from '@/components/elements/svg/BackArrowSvg/BackArrowSvg'

import styles from '@/styles/good/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const GoodUnitPage = () => {
  const mode = useStore($mode)
  const user = useStore($user)
  const goodUnit = useStore($goodUnit)
  const goodUnits = useStore($goodsUnits)
  const cartItems = useStore($shoppingCart)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const isInCart = cartItems.some((item) => item.partId === goodUnit.id)
  const spinnerToggleCart = useStore(removeFromCartFx.pending)
  const spinnerSlider = useStore(getGoodsFx.pending)
  const topModel = goodUnits?.rows
    ?.filter((item) => item.in_stock > 0)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 10)

  useEffect(() => {
    loadGoodUnit()
  }, [])

  const loadGoodUnit = async () => {
    try {
      const data = await getGoodsFx('/goods?limit=20&offset=0')

      setGoodsUnits(data)
      setGoodsUnitsByPopularity()
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const toggleToCart = () =>
    toggleCartItem(user.username, goodUnit.id, isInCart)

  return (
    <section>
      <div className="container">
        <div className={`${styles.good__top} ${darkModeClass}`}>
          <Link
            href="/catalog"
            className={`${styles.good__title_wrapper} ${darkModeClass}`}
          >
            <BackArrowSvg />
            <h2
              className={`${styles.good__title_wrapper__title} ${darkModeClass}`}
            >
              Карточка товара
            </h2>
          </Link>
          <div className={styles.good__wrapper}>
            <div className={styles.good__wrapper__image_wrapper}>
              <img
                src={goodUnit?.images}
                alt="Phone image"
                className={styles.good__wrapper__image_wrapper__image}
              />
            </div>
            <div className={styles.good__wrapper__info}>
              <h2
                className={`${styles.good__wrapper__info__title} ${darkModeClass}`}
              >
                Смартфон {goodUnit.goods_model} {goodUnit.name}
              </h2>
              <div className={styles.good__wrapper__info__descr}>
                <h3
                  className={`${styles.good__wrapper__info__descr__title} ${darkModeClass}`}
                >
                  Характеристики:
                </h3>
                <span
                  className={`${styles.good__wrapper__info__descr__text} ${darkModeClass}`}
                >
                  {goodUnit.description}
                </span>
              </div>
            </div>
            <div className={`${styles.good__wrapper__buy} ${darkModeClass}`}>
              <span
                className={`${styles.good__wrapper__buy__price} ${darkModeClass}`}
              >
                {(goodUnit.price * (100 - goodUnit.discount)) / 100} ₴
              </span>
              <button
                className={`button ${styles.good__wrapper__buy__btn} ${
                  isInCart ? styles.in_cart : ''
                }`}
                onClick={toggleToCart}
              >
                {spinnerToggleCart ? (
                  <span
                    className={spinnerStyles.spinner}
                    style={{ top: 10, left: '45%' }}
                  />
                ) : (
                  <>
                    {isInCart ? (
                      <span>Добавлено в кoрзину</span>
                    ) : (
                      <span>В корзину</span>
                    )}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className={styles.good__bottom}>
          <h2 className={`${styles.good__bottom__title} ${darkModeClass}`}>
            Наш топ, согласно отзывам пользователей:
          </h2>
          <SaleSlider items={topModel || []} spinner={spinnerSlider} />
        </div>
      </div>
    </section>
  )
}

export default GoodUnitPage
