import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)

export async function POST(req,res) {
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              unit_amount: 5000,
              product_data: {
                name: 'T-shirt',
              },
              currency: 'usd',
            },
            quantity: 1,
          },
          {
            price_data: {
              unit_amount: 150,
              product_data: {
                name: 'Pantalon',
              },
              currency: 'usd',
            },
            quantity: 2,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.PUBLIC_URL}/?success=true`,
        cancel_url: `${process.env.PUBLIC_URL}/?canceled=true`,
      });
      console.log(session.url)
      return NextResponse.json(session)
      
    } catch (err) {
      return NextResponse.json(err)
    }
}