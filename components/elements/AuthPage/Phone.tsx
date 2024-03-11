import { IAuthPageInput } from '@/types/auth'
import styles from '@/styles/auth/index.module.scss'

const PhoneInput = ({ register, errors }: IAuthPageInput) => (
  <label className={styles.form__label}>
    <input
      {...register('phone', {
        required: 'Введите Ваш телефон!',
        pattern: {
          value: /^\+?[0-9]{1,4}-?[0-9]{3}-?[0-9]{7}$/,
          message: 'Неправильный формат телефонного номера!',
        },
      })}
      className={styles.form__input}
      type="phone"
      placeholder="+38-098-7654321"
    />
    {errors.phone && (
      <span className={styles.error_alert}>{errors.phone?.message}</span>
    )}
  </label>
)

export default PhoneInput
