import { IAuthPageInput } from '@/types/auth'
import styles from '@/styles/auth/index.module.scss'

const AddressInput = ({ register, errors }: IAuthPageInput) => (
  <label className={styles.form__label}>
    <input
      {...register('address', {
        required: 'Введите адрес доставки!',
        minLength: 2,
        maxLength: 35,
      })}
      className={styles.form__input}
      type="text"
      placeholder="Address"
    />
    {errors.address && (
      <span className={styles.error_alert}>{errors.address?.message}</span>
    )}
    {errors.address && errors.address.type === 'minLength' && (
      <span className={styles.error_alert}>Минимум 2 символа!</span>
    )}
    {errors.address && errors.address.type === 'maxLength' && (
      <span className={styles.error_alert}>Не более 35 символов!</span>
    )}
  </label>
)

export default AddressInput
