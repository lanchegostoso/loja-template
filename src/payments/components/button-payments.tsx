import { Button } from "@/components/ui";
import Link from "next/link";

type ButtonProps = {
    btnText: string
    btnLink: string
    btnColor?: string
}

export default function ButtonPayments({btnText, btnColor, btnLink}: ButtonProps) {
    return (
        <Link className={`w-full py-4 rounded text-[1.125rem] text-center text-white font-bold ${btnColor ? btnColor : 'bg-success700'}`} href={btnLink}>{btnText}</Link>
    );
}