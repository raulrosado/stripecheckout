'use client'
import { useStripe, useElements } from '@stripe/react-stripe-js'
import { CheckCircleIcon, TrashIcon, ArrowPathIcon } from '@heroicons/react/20/solid'
import ProductosCheckout from "./ProductosCheckout";
import { useState } from "react";
import ProductoCheckoutView from "./Products/ProductoCheckoutView";

export default function Ordersummary(props) {
    const { products } = ProductosCheckout();
    const stripe = useStripe()

    const createPayment = async () => {
        // showLoading(true)
        const res = await fetch('/api/stripe/create-payment-intent', {
            method: 'POST',
            body: JSON.stringify({
                amount: 25 * 100,
                description: 'Descripcion de la venta'
            })
        })

        const data = await res.json()
        confirmPayment(data.client_secret)
    }

    const confirmPayment = async (paymentIntentClientSecret) => {

        if (stripe) {
            //     // console.log(paymentIntentClientSecret)
            const { token } = await stripe?.createToken(props.element)
            const result = await stripe?.confirmCardPayment(paymentIntentClientSecret, {
                payment_method: {
                    card: props.element,
                    billing_details: {
                        name: 'raul Remedios',
                        email: 'raulrosado91@gmail.com',
                        phone: '8166768591',
                        address: {
                            city: 'San Francisco',
                            country: 'US',
                            line1: '1234 Fake Street',
                            line2: null,
                            postal_code: '94102',
                            state: 'CA'
                        }
                    }
                }
            })
            // showLoading(false)
        }
    }

    return (
        <>

            <div className='mt-10 lg:mt-0'>
                <h2 className='text-lg font-medium text-gray-900'>Order summary</h2>

                <div className='mt-4 rounded-lg border border-gray-200 bg-white shadow-sm'>
                    <h3 className='sr-only'>Items in your cart</h3>
                    <ul role='list' className='divide-y divide-gray-200'>
                        {products.map((product) => (
                            <ProductoCheckoutView key={product.id} product={product} />
                        ))}
                    </ul>
                    <dl className='space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6'>
                        <div className='flex items-center justify-between'>
                            <dt className='text-sm'>Subtotal</dt>
                            <dd className='text-sm font-medium text-gray-900'>$64.00</dd>
                        </div>
                        <div className='flex items-center justify-between'>
                            <dt className='text-sm'>Shipping</dt>
                            <dd className='text-sm font-medium text-gray-900'>${props.payMethod}</dd>
                        </div>
                        <div className='flex items-center justify-between'>
                            <dt className='text-sm'>Taxes</dt>
                            <dd className='text-sm font-medium text-gray-900'>$5.52</dd>
                        </div>
                        <div className='flex items-center justify-between border-t border-gray-200 pt-6'>
                            <dt className='text-base font-medium'>Total</dt>
                            <dd className='text-base font-medium text-gray-900'>$75.52</dd>
                        </div>
                    </dl>

                    <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                        <button
                            type='buttom'
                            onClick={createPayment}
                            className='w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
                        >
                            Confirm order
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}