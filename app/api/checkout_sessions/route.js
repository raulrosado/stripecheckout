import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)

export async function POST(req,res) {
    console.log("req-->", req.body)
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
        success_url: `${process.env.PUBLIC_URL}/order/success?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.PUBLIC_URL}/?canceled=true`,
      });
      console.log("create-->session-->", session)
      return NextResponse.json(session)
    } catch (err) {
      return NextResponse.json(err)
    }
}
/**
{
  id: 'cs_test_b1uZfKizzK60itRKlGZmd05Uk7a1vMG7sAYu1EHTg3y7vK4AMk2APNCLcN',
  object: 'checkout.session',
  after_expiration: null,
  allow_promotion_codes: null,
  amount_subtotal: 5300,
  amount_total: 5300,
  automatic_tax: { enabled: false, status: null },
  billing_address_collection: null,
  cancel_url: 'http://localhost:3000/?canceled=true',
  client_reference_id: null,
  client_secret: null,
  consent: null,
  consent_collection: null,
  created: 1704332381,
  currency: 'usd',
  currency_conversion: null,
  custom_fields: [],
  custom_text: {
    after_submit: null,
    shipping_address: null,
    submit: null,
    terms_of_service_acceptance: null
  },
  customer: null,
  customer_creation: 'if_required',
  customer_details: null,
  customer_email: null,
  expires_at: 1704418781,
  invoice: null,
  invoice_creation: {
    enabled: false,
    invoice_data: {
      account_tax_ids: null,
      custom_fields: null,
      description: null,
      footer: null,
      metadata: {},
      rendering_options: null
    }
  },
  livemode: false,
  locale: null,
  metadata: {},
  mode: 'payment',
  payment_intent: null,
  payment_link: null,
  payment_method_collection: 'if_required',
  payment_method_configuration_details: { id: 'pmc_1NIELbLcXDLFYcVlfJ42zZsc', parent: null },
  payment_method_options: { affirm: {} },
  payment_method_types: [ 'card', 'klarna', 'affirm', 'cashapp' ],
  payment_status: 'unpaid',
  phone_number_collection: { enabled: false },
  recovered_from: null,
  setup_intent: null,
  shipping_address_collection: null,
  shipping_cost: null,
  shipping_details: null,
  shipping_options: [],
  status: 'open',
  submit_type: null,
  subscription: null,
  success_url: 'http://localhost:3000/order/success?success=true&session_id={CHECKOUT_SESSION_ID}',
  total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
  ui_mode: 'hosted',
  url: 'https://checkout.stripe.com/c/pay/cs_test_b1uZfKizzK60itRKlGZmd05Uk7a1vMG7sAYu1EHTg3y7vK4AMk2APNCLcN#fidkdWxOYHwnPyd1blpxYHZxWjA0S0xGaGJJZl1BSUNcZlNpS
GE3MmhKQ2tmXEZCRHJVQnN0dmhmVWtxQzZPcHNAbT1nXVw1MmZkQWY2cjBPTTd3TX9GRF9XfDU9dWtCbndMPEFJT3BdVDBkNTVXcG9RY2JKSScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPydocGl
xbFpscWBoJyknYGtkZ2lgVWlkZmBtamlhYHd2Jz9xd3BgeCUl'
}

*/