"use client"
import {useStripe} from "@stripe/react-stripe-js";
import {useEffect, useState} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {loadStripe} from "@stripe/stripe-js";
function queryStringToJson(queryString) {
    return Object.fromEntries(new URLSearchParams(queryString));
}
import axios from "axios";

export default function OrdenSuccessPage() {
    const pathname = usePathname(); // '/'
    const searchParams = useSearchParams(); // authorize=ghkdghkdgh5k4dghk546d5gh4k64
    const urlParamsObject = queryStringToJson(searchParams || "");

    //const stripe = useStripe()
    const [customer, setcustomer]= useState();
    async function getData() {
        console.log("urlParamsObject-->", urlParamsObject)

        let data = JSON.stringify({
            "success": urlParamsObject.success || true,
            "session_id": urlParamsObject.session_id
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/orden/success',
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios.request(config)
            .then((response) => {
                setcustomer(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    useEffect(()=>{
        getData()
    },[pathname])

    return <>
        <h1 className={"text-black"}>Thanks for your order, {customer?.success?.customer.name|| "user"}!</h1>
    </>
}