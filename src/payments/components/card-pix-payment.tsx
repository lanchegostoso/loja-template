import * as React from "react"
import PaymentActions from "../actions/paymentActions"
import { FaPix, FaChevronRight  } from "react-icons/fa6";
export function CardPixPayment() {
    return (
        <form className="w-full card-border" action={PaymentActions.createPaymentPix}>
            <button type='submit' className="w-full relative flex items-center gap-4 p-2 text-[2rem] text-left text-gray-900 font-bold">
                <FaPix className="text-[2.8rem]"/>
                <p>Pix <span className="block text-[0.75rem]">Pagar com pix é rápido e fácil ! </span></p>
                <FaChevronRight className="text-[1rem] absolute right-4"/>
            </button>
        </form>
    )
}
