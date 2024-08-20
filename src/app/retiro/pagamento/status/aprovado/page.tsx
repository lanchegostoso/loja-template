
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card"
import { BsCheck2Circle } from "react-icons/bs";

import { HeaderColumn } from "@/components/shared/header-column/header-column";
import ButtonLink from "@/components/shared/button-link";

export default function Page() {


return (
    <Card className="w-[98%] max-w-[380px] flex flex-col gap-2 my-2 mx-auto border-0">
        <HeaderColumn icon={BsCheck2Circle} iconColor="text-success" text={"Pagamento efetuado com sucesso!"} textBold={true} />
        <CardHeader className="flex flex-col items-center gap-2">
        <Image src={'/img/LogoResgatandoAnas.png'} alt="alt" width={103} height={101} />
        <h6 className='font-bold'>Obrigado pela sua compra 🙂</h6>
  </CardHeader>
    <CardContent className="flex flex-col justify-center gap-4">
        <p>Caro usuário(a),</p>
        <p><span className='font-bold'>Para pagamentos via Pix:</span> Enviar o comprovante para um dos responsáveis contendo a descrição: Retiro de mulheres 2024.</p>
        <p> *Obs: o contato das responsáveis está no fim da página.</p>
        <p><span className='font-bold'>Para pagamentos com Cartão e Pix: </span>Gostaríamos de informar que a mensagem de aviso de pagamento foi enviada para o seu e-mail. Por favor, verifique a sua caixa de entrada.</p>
        <p>Se você não encontrar a mensagem na sua caixa de entrada, pode ser que ela tenha sido enviada para a sua pasta de spam. Para verificar a pasta de spam, siga os seguintes passos:</p>
        <p>
            <p>1. Abra o seu e-mail.</p>
            <p>2. Procure por uma pasta chamada ‘Spam’ ou ‘lixo eletrônico’.</p>
            <p>3. Abra a pasta e procure pela mensagem de aviso de pagamento.</p>
        </p>
        <p>Se você encontrar a mensagem na pasta de spam, marque-a como ‘Não é spam’ para futuras mensagens serem enviadas diretamente para a sua caixa de entrada.</p>
        <p>Além disso, se você estiver recebendo muitos e-mails indesejados, você pode querer ajustar as configurações de filtro de spam do seu e-mail. Normalmente, você pode encontrar essas configurações nas opções ou configurações do seu e-mail.</p>
        <p>Esperamos que estas informações sejam úteis!</p>
        <p>Atenciosamente,</p>
        <p>Equipe de Suporte</p>
    </CardContent>
        <CardFooter className="flex flex-col justify-center gap-2">
            <h6 className="mt-4 font-bold">Mais informações entre em contato com o suporte :</h6>
            <p className="w-full">
                <p className="mt-2 flex justify-between text-gray-600">Pra. Roberta: <span>(21) 97026-1802</span></p>
                <p className="flex justify-between text-gray-600">Pra. Glória: <span>(21) 97068-6842</span></p>
                <p className="mt-2 font-bold text-gray-600">Informações adicionais:</p>
                <p className="flex justify-between text-gray-600">Diac. Camila: <span>(21) 99363-6957</span></p>
            </p>
        <ButtonLink btnClass='text-center text-white' btnText={"Voltar a tela home"} btnLink={"/"}/>
    </CardFooter>
    </Card>
    )
}