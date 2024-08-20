import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {

  return (
    <div className='flex flex-wrap gap-4 justify-between'>
      <Link className='min-w-[45%] bg-slate-200 rounded-sm p-8 text-center' href="/dashboard/produto">
          Criar Produto
      </Link>
      <Link className='min-w-[45%] bg-slate-200 rounded-sm p-8 text-center' href="/dashboard/categoria">
          Criar Categoria
      </Link>
    </div>
  )
}