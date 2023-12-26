import Stripe from 'stripe'
import { NextResponse } from 'next/server'
// This is your test secret API key.
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)

export async function POST(request) {
  const {amount,description} = await request.json()
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'],
      description: description
    });
    return NextResponse.json(paymentIntent)
  } catch (error) {
    // return res.status(error?.statusCode).json(error);
    console.log(error)
    return NextResponse.json(error)
  }
}