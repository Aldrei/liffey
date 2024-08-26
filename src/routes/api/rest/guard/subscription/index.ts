import { router } from '@/express.instance'
import { subscriptionPaymentIntent } from '@/services/subscription'

router.post('/api/subscription/payment-intent', subscriptionPaymentIntent)

export default router