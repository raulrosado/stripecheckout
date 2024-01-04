import {NextResponse} from "next/server";
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);
/*const stripe = await loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);*/
export async function POST(request,response) {
    const params = await request.json();
    console.log("req-->", params)
    try {
        const session = await stripe.checkout.sessions.retrieve(params?.session_id);
        console.log("session-->", session)

        const response = {
            success: {
                id : session.id,
                amount_total : session.amount_total,
                currency : session.currency,
                customer: {
                    email : session.customer_details.email || false,
                    name : session.customer_details.name || false,
                    phone : session.customer_details.phone || false
                },
                payment_status : session.payment_status,
                payment_intent : session.payment_intent,
                status : session.status,
            }
        }

        console.log("response-->", response)

        // enviar a la base de datos aqui...

        return NextResponse.json(response)
    } catch (err) {
        return NextResponse.json(err)
    }
}
/**
 {
  id: 'cs_test_b13meUbbLqmgwVVHCjXhGtHer2fI3GeRki7DVXUjBhWAFOfxdXDMAludCL',
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
  created: 1704328009,
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
  customer_details: {
    address: {
      city: null,
      country: 'ES',
      line1: null,
      line2: null,
      postal_code: null,
      state: null
    },
    email: 'fiderosado@gmail.com',
    name: 'Fidel',
    phone: null,
    tax_exempt: 'none',
    tax_ids: []
  },
  customer_email: null,
  expires_at: 1704414409,
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
  payment_intent: 'pi_3OUemSLcXDLFYcVl3NWgYebn',
  payment_link: null,
  payment_method_collection: 'if_required',
  payment_method_configuration_details: { id: 'pmc_1NIELbLcXDLFYcVlfJ42zZsc', parent: null },
  payment_method_options: {},
  payment_method_types: [ 'card', 'klarna', 'cashapp' ],
  payment_status: 'paid',
  phone_number_collection: { enabled: false },
  recovered_from: null,
  setup_intent: null,
  shipping_address_collection: null,
  shipping_cost: null,
  shipping_details: null,
  shipping_options: [],
  status: 'complete',
  submit_type: null,
  subscription: null,
  success_url: 'http://localhost:3000/order/success?success=true&session_id={CHECKOUT_SESSION_ID}',
  total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
  ui_mode: 'hosted',
  url: null
}

*/