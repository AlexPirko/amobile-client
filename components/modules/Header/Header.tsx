import { useStore } from 'effector-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { $mode } from '@/context/mode'
import SearchInput from '@/components/elements/SearchInput/SearchInput'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { setDisableCart } from '@/context/shopping-cart'
import NavBar from '@/components/elements/NavBar/NavBar'
import styles from '@/styles/header/index.module.scss'

const Header = () => {
  const isMedia800 = useMediaQuery(860)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/order') {
      setDisableCart(true)
      return
    }

    setDisableCart(false)
  }, [router.pathname])

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__container}`}>
        <h1 className={`${styles.header__logo} ${darkModeClass}`}>
          <Link href="/" legacyBehavior passHref>
            <a className={styles.header__logo__link}>A-mobile</a>
          </Link>
        </h1>
        <div className={styles.header__search}>
          <SearchInput />
        </div>
        {!isMedia800 && <NavBar />}
      </div>
    </header>
  )
}

export default Header
