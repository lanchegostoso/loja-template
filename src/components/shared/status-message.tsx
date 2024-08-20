'use client'
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { BsCheck2Circle, BsEmojiFrown } from 'react-icons/bs';
import Image from 'next/image';
import { Button } from '../ui';

export default function StatusMessage({statusMessageProps}: Readonly<{statusMessageProps:StatusMessageProps}>) {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="w-full my-2 mx-auto flex flex-col gap-14 text-center items-center">
            <Image src={'/img/LogoResgatandoAnas.png'} alt="alt" width={103} height={101} />
            <Card className="w-[90%] max-w-[360px] p-2">
                <CardContent className="flex flex-col gap-4 text-center items-center">
                    {statusMessageProps.type === 'ok' ? <BsCheck2Circle className="w-16 h-16 text-success" /> : <BsEmojiFrown className="w-16 h-16 text-red300" />}
                    <h5>{statusMessageProps.title}</h5>
                    <p>{statusMessageProps.message}</p>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 text-[0.75rem]">
                    <span>Clique no link abaixo para voltar para a pagina anterior</span>
                    {typeof window !== 'undefined' && (
                        <Button onClick={handleBack} variant="link" className='text-blue500'>Voltar</Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}