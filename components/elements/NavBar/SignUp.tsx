import { useRouter } from 'next/router'
import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import ProfileSvg from '../svg/ProfileSvg/ProfileSvg'

import styles from '@/styles/profileDropDown/index.module.scss'

const SignUp = () => {
  const mode = useStore($mode)
  const router = useRouter()
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const handleRedirectToSignup = async () => {
    router.push('/auth')
  }

  return (
    <div className={styles.profile}>
      <button
        className={`${styles.profile__btn} ${darkModeClass}`}
        onClick={handleRedirectToSignup}
      >
        <span className={styles.profile__span}>
          <ProfileSvg />
        </span>
        <span className={styles.profile__text}>Вход</span>
      </button>
    </div>
  )
}

export default SignUp
