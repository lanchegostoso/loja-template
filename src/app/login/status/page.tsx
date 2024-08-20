'use client'
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { BsCheck2Circle } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/user');
        }, 5000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="w-full my-2 mx-auto flex flex-col gap-14 text-center items-center">
            <Image src={'/img/LogoResgatandoAnas.png'} alt="alt" width={103} height={101} />
            <Card className="w-[90%] max-w-[360px] p-2">
                <CardContent className="flex flex-col gap-4 text-center items-center">
                    <BsCheck2Circle className="w-16 h-16 text-success" />
                    <h5>Confirmação de Login</h5>
                    <p>Seu login foi realizado com sucesso.</p>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 text-[0.75rem]">
                    <span>Em 5 segundos você irá para sua pagina.  Se estiver demorando clique no link abaixo para seguir.</span>
                    <Link className='text-blue500' href='/user'>Ir para Minha Conta</Link>
                </CardFooter>
            </Card>
        </div>
    );
}