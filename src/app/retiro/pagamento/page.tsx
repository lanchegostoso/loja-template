import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image';

import './style.css';
import { CardPixPayment } from "@/payments/components/card-pix-payment";
import { CardCreditPayment } from "@/payments/components/card-credit-payment";

export default function Pagamento() {


  return (
    <Card className="w-[98%] max-w-[380px] flex flex-col gap-9 my-2 mx-auto border-0">
      <CardHeader className="flex flex-row gap-2">
      <Image src={'/img/LogoResgatandoAnas.png'} alt="alt" width={47} height={47} />
        <CardTitle><h5>Resgatando Anas</h5> <p>Descendo do salto</p></CardTitle>
      </CardHeader>
      <CardContent>
      <Card className="info p-2 my-2 mx-auto">
        <ul className="list-info flex flex-col gap-3">
          <li className="font-bold">Atenção</li>
          <li>Data 25, 26 e 27 de Outubro de 2024</li>
          <li>Final das Inscrições dia 05.10.2024 as 20:00h</li>
          <li>Ingressos limitados, uma unidade  por pessoa</li>
        </ul>
      </Card>
        <div className="w-full flex flex-col items-center mt-6">
          <p className="font-bold tracking-tight">Valor de 1 ingresso:</p>
          <h2 className="mb-6 text-blue500">R$ 250,00*</h2>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-start">
          <p className="font-bold">Escolha a forma de pagamento:</p>
          <CardPixPayment/>
          <CardCreditPayment/>
      </CardFooter>
    </Card>
  )
}