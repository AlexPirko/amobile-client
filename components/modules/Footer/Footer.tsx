import { useMediaQuery } from '@/hooks/useMediaQuery'
import NavBar from '@/components/elements/NavBar/NavBar'
import styles from '@/styles/footer/index.module.scss'

const Footer = () => {
  const isMedia800 = useMediaQuery(860)

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footer__container}`}>
        {isMedia800 && <NavBar />}
      </div>
    </footer>
  )
}

export default Footer
