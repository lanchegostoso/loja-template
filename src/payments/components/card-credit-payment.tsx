import * as React from "react"
import { FaChevronRight  } from "react-icons/fa6";
import { BsCreditCard2Back } from "react-icons/bs";
import Link from "next/link";
export function CardCreditPayment() {
    return (
        <Link className="w-full card-border" href={"/retiro/pagamento/cartao"} >
            <button type='submit' className="w-full relative flex items-center gap-4 p-2 text-[2rem] text-left text-gray-900 font-bold">
                <BsCreditCard2Back className="text-[2.8rem]"/>
                <p>Cartões <span className="block text-[0.75rem]">Parcele em até 12x </span></p>
                <FaChevronRight className="text-[1rem] absolute right-4"/>
            </button>
        </Link>
    )
}
