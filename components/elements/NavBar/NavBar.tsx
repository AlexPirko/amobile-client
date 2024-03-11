import Link from 'next/link'
import { useStore } from 'effector-react'

import ProfileDropdown from './ProfileDropdown'
import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CartPopup from '@/components/elements/NavBar/CartPopup/CartPopup'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import SignUp from './SignUp'

import CatalogSvg from '../svg/CatalogSvg/CatalogSvg'
import HomeSvg from '../svg/HomeSvg/HomeSvg'
import styles from '@/styles/header/index.module.scss'

const NavBar = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const isMedia800 = useMediaQuery(860)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <nav className={`${styles.header__nav} ${darkModeClass}`}>
      <ul className={styles.header__nav__list}>
        {isMedia800 && (
          <li className={styles.header__nav__list__item}>
            <Link href="/" passHref legacyBehavior>
              <a
                className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
              >
                <div className={styles.header__nav__list__item__home__wrapper}>
                  <span
                    className={`${styles.header__nav__list__item__home__svg} ${darkModeClass}`}
                  >
                    <HomeSvg />
                  </span>
                  <span className={styles.header__nav__list__item__home__text}>
                    Главная
                  </span>
                </div>
              </a>
            </Link>
          </li>
        )}
        <li className={styles.header__nav__list__item}>
          <Link href="/catalog" passHref legacyBehavior>
            <a
              className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
            >
              <div className={styles.header__nav__list__item__catalog__wrapper}>
                <span
                  className={`${styles.header__nav__list__item__catalog__svg} ${darkModeClass}`}
                >
                  <CatalogSvg />
                </span>
                <span className={styles.header__nav__list__item__catalog__text}>
                  Каталог
                </span>
              </div>
            </a>
          </Link>
        </li>
        <li className={styles.header__nav__list__item}>
          <CartPopup />
        </li>
        <li className={styles.header__nav__list__item}>
          {shouldLoadContent ? <ProfileDropdown /> : <SignUp />}
        </li>
        <li className={styles.header__nav__list__item}>
          <ModeToggler />
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
