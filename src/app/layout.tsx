import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'
import FooterMenu from '@/components/FooterMenu';
import { HeaderMenu } from '@/components/HeaderMenu';
const notoSans = Noto_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Loja Template',
  description: 'Cardápio Virtual para hamburgueria, açaiteria, sorveteria, restaurantes, delivery e muito mais.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={notoSans.className}>
      <HeaderMenu/>
      <div className='max-w-[380px] my-24 mx-auto'>{children}</div>
      <FooterMenu/>
      </body>
    </html>
  )
}
