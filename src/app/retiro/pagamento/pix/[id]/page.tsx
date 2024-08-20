import { redirect } from 'next/navigation';
import StatusMessage from "@/components/shared/status-message";
import Image from 'next/image';
import { PageQrCodePix } from "@/payments/components/qrCodePix";
import ServicePayment from "@/payments/services/paymentServices";
import { CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page({ params }: { params: { id: any } }) {
  const id = params.id;
  const data = await ServicePayment.getInfoPayment(id);

  if (!data.detail.id) {
    return (
      <StatusMessage statusMessageProps={{
        title: "Erro no sistema",
        type: "error",
        message: "Não foi possível carregar os dados do pagamento ou não encontramos no sistema."
      }} />
    );
  }

  if (data.detail.status === 'Cancelado') {
    redirect('/retiro/pagamento/status/pix-expirado');
    return null;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <CardHeader className="flex flex-col items-center gap-2">
        <Image src={'/img/icons/pix-icon.svg'} alt="Logo do sistema de pagamento pix" width={50} height={50} />
        <CardTitle><h6>Efetuar Pagamento via pix</h6></CardTitle>
      </CardHeader>
      <PageQrCodePix detail={data.detail} />
    </div>
  );
}
