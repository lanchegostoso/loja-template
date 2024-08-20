
import { Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import { BsEmojiWinkFill } from "react-icons/bs";

import { HeaderColumn } from "@/components/shared/header-column/header-column";
import ServicePayment from "@/payments/services/paymentServices";
import StatusMessage from "@/components/shared/status-message";
import { PageQrCodePix } from "@/payments/components/qrCodePix";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({ params }: Readonly<{ params: { id: any } }>) {
    
    const id = params.id
    const data = await ServicePayment.getInfoPayment(id)
    if(!data.detail.id){
        return <StatusMessage statusMessageProps={{
            title: "Erro no sistema",
            type: "error",
            message: "Não foi possivel carregar os dados do pagamento ou não encontramos no sistema."
        }}/>
    }

    if (data.detail.status === 'Cancelado') {
        redirect('/retiro/pagamento/status/pix-expirado');
        return null;
      }

return (
    <Card className="w-[98%] max-w-[380px] flex flex-col gap-2 my-2 mx-auto border-0">
        <HeaderColumn icon={BsEmojiWinkFill} iconColor="text-blue500" text={"Pagamento Pendente!"} textBold={true} />
    <CardContent className="flex flex-col justify-center gap-4">
        <p>Agradecemos pela sua paciência enquanto o pagamento está sendo analisado pelo banco. A confirmação pode levar até 30 minutos. Fique atento ao seu e-mail para receber a resposta. Para voltar ao seu perfil, clique no botão abaixo.</p>
        <div className="flex flex-col items-center p-4">
            <PageQrCodePix detail={data.detail} />
        </div>
    </CardContent>
        <CardFooter className="flex flex-col justify-center gap-2 mb-4">
            <h6 className="mt-4 font-bold">Mais informações entre em contato com o suporte :</h6>
            <p className="w-full mb-4">
                <p className="mt-2 flex justify-between text-gray-600">Pra. Roberta: <span>(21) 97026-1802</span></p>
                <p className="flex justify-between text-gray-600">Pra. Glória: <span>(21) 97068-6842</span></p>
                <p className="mt-2 font-bold text-gray-600">Informações adicionais:</p>
                <p className="flex justify-between text-gray-600">Diac. Camila: <span>(21) 99363-6957</span></p>
            </p>
    </CardFooter>
    <Link className="w-full py-4 rounded text-center bg-blue700 text-white" href={'/user'}>Voltar</Link>
    </Card>
    )
}