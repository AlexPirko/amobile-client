import Image from 'next/image'
import { useStore } from 'effector-react'
import Link from 'next/link'

import { $mode } from '@/context/mode'
import { $user } from '@/context/user'
import { $shoppingCart } from '@/context/shopping-cart'
import { toggleCartItem } from '@/utils/shopping-cart'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import LikeSvg from '../svg/LikeSvg/LikeSvg'

import styles from '@/styles/catalogListItem/index.module.scss'
import { IGoodsUnit } from '@/types/goods-model'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CatalogListItem = (item: IGoodsUnit) => {
  const mode = useStore($mode)
  const user = useStore($user)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const shoppingCart = useStore($shoppingCart)
  const isInCart = shoppingCart.some((cartItem) => cartItem.partId === item.id)
  const spinner = useStore(removeFromCartFx.pending)

  const toggleToCart = () => toggleCartItem(user.username, item.id, isInCart)

  return (
    <div className={styles.catalog__list_item__wrapper}>
      <div className={styles.catalog__list_item__wrapper__left}>
        <div className={styles.catalog__list_item__wrapper__image_wrapper}>
          <div
            className={
              styles.catalog__list_item__wrapper__image_wrapper__infoblock
            }
          >
            {item?.discount > 0 && (
              <div
                className={
                  styles.catalog__list_item__wrapper__image_wrapper__infoblock__discount
                }
              >
                {-item?.discount}%
              </div>
            )}
            {item?.new && (
              <div
                className={
                  styles.catalog__list_item__wrapper__image_wrapper__infoblock__new
                }
              >
                <span>New</span>
              </div>
            )}
          </div>
          <Image
            src={item?.images}
            alt="Phone image"
            fill
            className={styles.catalog__list_item__wrapper__image_wrapper__image}
          />
        </div>
        <div
          className={`${styles.catalog__list_item__wrapper__info} ${darkModeClass}`}
        >
          <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
            <div
              className={`${styles.catalog__list_item__wrapper__info__subtitle} ${darkModeClass}`}
            >
              Смартфон {item?.goods_model} {item?.name}
            </div>
          </Link>
          <div
            className={`${styles.catalog__list_item__wrapper__info__description} ${darkModeClass}`}
          >
            {item?.description}
          </div>
          {item?.in_stock > 0 ? (
            <div
              className={styles.catalog__list_item__wrapper__info__availability}
            >
              В наличии
            </div>
          ) : (
            <div
              className={
                styles.catalog__list_item__wrapper__info__availability__non
              }
            >
              Нет в наличии
            </div>
          )}
        </div>
      </div>

      <div className={styles.catalog__list_item__wrapper__right}>
        <div className={styles.catalog__list_item__wrapper__price_wrapper}>
          <span
            className={`${styles.catalog__list_item__wrapper__price_wrapper__new_price} ${darkModeClass}`}
          >
            {(item?.price * (100 - item?.discount)) / 100} ₴
          </span>
          {item?.discount > 0 && (
            <span
              className={
                styles.catalog__list_item__wrapper__price_wrapper__old_price
              }
            >
              {item?.price} ₴
            </span>
          )}
        </div>
        <div className={styles.catalog__list_item__wrapper__bottom}>
          <div
            className={`${styles.catalog__list_item__wrapper__bottom__icon} ${darkModeClass}`}
          >
            <LikeSvg />
          </div>
          <button
            className={`button ${styles.catalog__list_item__wrapper__btn} ${
              isInCart ? styles.added : ''
            }`}
            disabled={spinner}
            onClick={toggleToCart}
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  )
}

export default CatalogListItem
