"use client"
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';
import Image from 'next/image';
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

export async function PageQrCodePix({ detail }: UserPaymentDetails) {
  const [copied, setCopied] = useState(false);
  const [exibirQrCode, setExibirQrCode] = useState(false);

  const showQrCode = () =>{
    setExibirQrCode(!exibirQrCode)
  }

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 10000);
  };

  return (
    <Card className="w-full border-0">
      <CardContent className="flex flex-col gap-2">
        <p className='font-bold'>Importante</p>
        <p className='px12'>Após o QRCode ou código do PIX serem gerados, você tem 30 minutos para efetuar o pagamento.
        Caso contrário o pedido será automaticamente cancelado.</p>
        <button className="w-full py-4 rounded text-[1.125rem] text-white font-bold text-center bg-success700" onClick={showQrCode}>
        {exibirQrCode ? 'Esconder QR code' : 'Exibir QR code'}
        </button>
        {exibirQrCode && <div className="flex flex-col items-center p-4">
          <QRCode value={detail.qr_code!} size={300} />
        </div>}
        <CopyToClipboard text={detail.qr_code!} onCopy={handleCopy}>
          <button className="w-full py-4 rounded text-[1.125rem] text-[#A38D8E] text-center border-2 border-[#A38D8E]">
            {copied ? 'Copiado' : 'Copiar código'}
          </button>
        </CopyToClipboard>
          <p className='text-success700'>{copied ? 'Código copiado com sucesso!' : ''}</p>
        <p className='px12'>A confirmação automática do pagamento pode demorar alguns minutos.</p>
      </CardContent>
    </Card>
  );
}