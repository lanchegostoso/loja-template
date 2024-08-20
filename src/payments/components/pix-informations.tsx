"use client"
import { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import CopyToClipboard from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';
import Link from "next/link"
import Image from 'next/image';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, Input} from "@/components/ui"

export async function PagePixInfo( {detail} : UserPaymentDetails ){
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
    return(
      <Card className="box-border w-full whitespace-normal overflow-auto">
      <CardHeader className="flex flex-col items-center gap-2">
      <Image src={'/img/icons/pix-icon.svg'} alt="Logo do sistema de pagamento pix" width={50} height={50} />
        <CardTitle><h6>Efetuar Pagamento via pix</h6></CardTitle>
      </CardHeader>
        <CardContent className="flex flex-col gap-2">
            <p>Id da compra: {detail.id}</p>
            <p>Descrição: {detail.description}</p>
            {/* <p>Investimento: {detail.tra}</p> */}
            <p>Tipo de pagamento: {detail.payment_method_id}</p>
            <p>Status: {detail.status}</p>
            <p>Código de pagamento:
              <div className="flex items-center">
              <CopyToClipboard text={detail.qr_code!} onCopy={handleCopy}>
              <button className="w-full py-4 rounded text-[1.125rem] text-center border-[#A38D8E]">
              Copiar codigo
                </button>
              </CopyToClipboard>
              {copied && <span style={{ color: 'green' }}>Copiado</span>}
              </div>
            </p>
              <div className="flex flex-col items-center p-4">
                <QRCode value={detail.qr_code!} size={300} />
              </div>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Button><Link href={detail.ticket_url!}>Link Mercado pago</Link></Button>
        </CardFooter>

    </Card>
    )
}