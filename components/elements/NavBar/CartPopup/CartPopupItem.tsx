/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import Link from 'next/link'

import { $mode } from '@/context/mode'
import { IShoppingCartItem } from '../../../../types/shopping-cart'
import CartItemCounter from '@/components/elements/CartItemCounter/CartItemCounter'
import { usePrice } from '@/hooks/usePrice'
import CloseSvg from '../../svg/CloseSvg/CloseSvg'

import styles from '@/styles/cartPopup/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const CartPopupItem = ({ item }: { item: IShoppingCartItem }) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass =
    mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`
  const priceWithdiscount = (item.price * (100 - item?.discount)) / 100
  const { price, spinner, deleteCartItem, decreasePrice, increasePrice } =
    usePrice(item.count, item.partId, priceWithdiscount)

  return (
    <li className={styles.cart__popup__list__item}>
      <div className={styles.cart__popup__list__item__top}>
        <div className={styles.cart__popup__list__item__img}>
          <img src={item?.image} alt={item?.goods_model} />
        </div>
        <Link href={`/catalog/${item?.partId}`} passHref legacyBehavior>
          <a
            className={`${styles.cart__popup__list__item__text} ${darkModeClass}`}
          >
            <span>
              {item?.goods_model} {item?.name},
            </span>
          </a>
        </Link>
        <button onClick={deleteCartItem}>
          <span>
            {spinner ? (
              <span
                className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
                style={{ top: 0, left: 0, width: 20, height: 20 }}
              />
            ) : (
              <CloseSvg />
            )}
          </span>
        </button>
      </div>
      <div className={styles.cart__popup__list__item__bottom}>
        {item.in_stock === 0 ? (
          <span className={styles.cart__popup__list__item__empty}>
            Нет на складе
          </span>
        ) : (
          <CartItemCounter
            totalCount={item.in_stock}
            partId={item.partId}
            initialCount={item.count}
            increasePrice={increasePrice}
            decreasePrice={decreasePrice}
          />
        )}
        <span
          className={`${styles.cart__popup__list__item__price} ${darkModeClass}`}
        >
          {price} ₴
        </span>
      </div>
    </li>
  )
}

export default CartPopupItem
