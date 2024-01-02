"use client";
import React, { useEffect, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import Router from 'next/router'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const pagar = async () => {
    const res = fetch('/api/checkout_sessions', {
        method: 'POST',
        cache: 'no-store',
    }).then(response => response.json())
    .then(data=>{
        console.log(data);
        window.location.href = data.url
    })
}

export default function btncheckout() {
    return (
        <>
            <h1>Btn Checkout</h1>
            <section>
                <button type="buttom" onClick={pagar}>
                    Checkout
                </button>
            </section>
            <style jsx>
                {`
                        section {
                            background: #ffffff;
                            display: flex;
                            flex-direction: column;
                            width: 400px;
                            height: 112px;
                            border-radius: 6px;
                            justify-content: space-between;
                        }
                        button {
                            height: 36px;
                            background: #556cd6;
                            border-radius: 4px;
                            color: white;
                            border: 0;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.2s ease;
                            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
                        }
                        button:hover {
                            opacity: 0.8;
                        }
                        `}
            </style>
        </>
    )
}