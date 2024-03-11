import { FormEvent, useEffect, useState } from 'react'
import { useStore } from 'effector-react'

import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { $user } from '@/context/user'
import {
  $shoppingCart,
  $totalPrice,
  setShoppingCart,
} from '@/context/shopping-cart'
import { removeFromCartFx } from '@/app/api/shopping-cart'
import { makePaymentFx } from '@/app/api/payment'

import styles from '@/styles/order/index.module.scss'
import { $mode } from '@/context/mode'
import { useRouter } from 'next/router'

const PaymentComponent = ({
  order,
  agreement,
}: {
  order: boolean
  agreement: boolean
}): JSX.Element => {
  const cart = useStore($shoppingCart)
  const user = useStore($user)
  const totalPrice = useStore($totalPrice)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const router = useRouter()

  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('')

  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    if (totalPrice === 0) return

    if (paymentStatus !== 'succeeded') return

    resetCart()
  })

  const resetCart = async () => {
    sessionStorage.removeItem('paymentId')
    await removeFromCartFx(`/shopping-cart/all/${user.userId}`)
    setShoppingCart([])
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (totalPrice === 0) return

    if (!stripe || !elements) return

    const cardEl = elements.getElement(CardElement)

    setIsProcessing(true)

    try {
      const res = await makePaymentFx({
        url: '/payment',
        amount: totalPrice,
        description: JSON.stringify(cart),
      })

      const { paymentIntent } = await stripe.confirmCardPayment(
        res.client_secret,
        {
          payment_method: {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            card: cardEl!,
          },
        }
      )

      if (!paymentIntent) {
        setPaymentStatus('Payment failed!')
      } else {
        setPaymentStatus(paymentIntent.status)
        setTimeout(() => {
          router.push('/')
        }, 3000)
      }
    } catch (error) {
      console.error(error)
      setPaymentStatus('Payment failed!')
    }

    setIsProcessing(false)
  }

  return (
    <div className={`${styles.order__pay__card} ${darkModeClass}`}>
      <form onSubmit={handleSubmit} id="payment-form">
        <CardElement id="card-element" />
        {!isProcessing && (
          <button
            disabled={!(order && agreement)}
            className={styles.order__pay__card__btn}
          >
            Оплатить
          </button>
        )}
        {isProcessing && <div>Processing...</div>}
        {!isProcessing && paymentStatus !== 'succeeded' && (
          <span
            style={{ display: 'block', color: 'red', marginBottom: '20px' }}
          >
            {paymentStatus}
          </span>
        )}
        {!isProcessing && paymentStatus === 'succeeded' && (
          <span
            style={{
              display: 'block',
              color: '#4e4c4c',
              fontWeight: '600',
              fontSize: '22px',
              marginBottom: '20px',
            }}
          >
            Оплата прошла успешно! Наш менеджер с Вами свяжется для уточнения
            деталей!
          </span>
        )}
      </form>
    </div>
  )
}

const PaymentGateway = ({
  order,
  agreement,
}: {
  order: boolean
  agreement: boolean
}): JSX.Element => {
  const stripePromise = loadStripe(
    'pk_test_51Oj0uQEFqItSxCYNw9lejhT2pc0eIuntB3kYVdtaTUeZIfH5TbQAlRdqL1F6j8IK08B8bIKl5CxLNfGM5eTCKaAI00qukXN8gg'
  )

  return (
    <Elements stripe={stripePromise}>
      <PaymentComponent order={order} agreement={agreement} />
    </Elements>
  )
}

export default PaymentGateway
