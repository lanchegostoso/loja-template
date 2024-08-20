import Link from "next/link";
import AuthService from '@/auth/service/authService'
import { BsFillPersonFill, BsHouseDoorFill  } from "react-icons/bs";
export default async function FooterMenu() {
    const session = await AuthService.isSessionValid()
    return (
    <div className='w-[100%] bg-primary fixed bottom-0 z-20 text-[#FDF9FA]' >
        <div className='max-w-[380px] w-[90%] mx-auto' >
            <div className='flex justify-between items-center gap-4 p-2'>
            {session? <>
            <Link className="flex flex-col items-center" href="/user"><BsFillPersonFill className="text-[1.5rem]" /><span>Minha Conta</span></Link>
            </>: <>
            <Link className="flex flex-col items-center" href="/retiro/login"><BsFillPersonFill className="text-[1.5rem]" /><span>Login</span></Link>
            </> }
            <Link className="flex flex-col items-center" href="/"><BsHouseDoorFill className="text-[1.5rem]" /><span>Home</span></Link>
            </div>
        </div>
    </div>
    );
}