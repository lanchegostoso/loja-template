import Link from "next/link";
import { IconType } from 'react-icons';

type ButtonProps = {
    btnText: string
    btnLink: string
    btnColor?: string
    btnClass?: string
    icon?: IconType
}

export default function ButtonLink({btnText, btnClass, btnColor, btnLink, icon: Icon}: Readonly<ButtonProps>) {
    return (
        <Link className={`w-full flex mt-2 gap-6 py-2 px-6 rounded items-center ${Icon && 'justify-between'}  ${btnClass} ${btnColor ?? 'bg-success700'}`} href={btnLink}>{btnText} {Icon && <Icon className="w-10 h-10 text-gray-900" />}</Link>
    );
}