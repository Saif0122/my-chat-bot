import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET)

export default async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{ price: 'price_XXXXX', quantity: 1 }],
    success_url: `${req.headers.origin}/?success=true`,
    cancel_url: `${req.headers.origin}/?canceled=true`,
  })
  res.status(200).json({ sessionId: session.id })
}
