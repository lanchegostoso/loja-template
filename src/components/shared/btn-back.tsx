'use client'
import { useRouter } from 'next/navigation';
import { Button } from '../ui';

export default function ButtonBack() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
                <div className='w-full flex'>
                    {typeof window !== 'undefined' && (
                            <Button onClick={handleBack} variant="link" className='text-blue500 m-4'>Voltar</Button>
                        )}
                </div>

    );
}