import { Card, CardContent, CardFooter} from "@/components/ui/card"
import { BsEmojiFrown  } from "react-icons/bs";

import { HeaderColumn } from "@/components/shared/header-column/header-column";
import ButtonLink from "@/components/shared/button-link";

export default function Page() {


return (
    <Card className="w-[98%] max-w-[380px] flex flex-col gap-2 my-2 mx-auto border-0">
        <HeaderColumn icon={BsEmojiFrown} iconColor="text-red300" text={"Pagamento cancelado!"} textBold={true} />
    <CardContent>
        <p className="">Não foi possível concluir o pagamento com esse cartão de crédito. Verifique as informações do seu cartão e tente novamente.</p>
    </CardContent>
        <CardFooter className="flex flex-col justify-center gap-2">
        <ButtonLink btnText={"Voltar para formas de pagamento"} btnClass="bg-blue500" btnLink={"/retiro/pagamento"}/>
            <h6 className="mt-4 font-bold">Mais informações entre em contato com o suporte :</h6>
            <p className="w-full">
                <p className="mt-2 flex justify-between text-gray-600">Pra. Roberta: <span>(21) 97026-1802</span></p>
                <p className="flex justify-between text-gray-600">Pra. Glória: <span>(21) 97068-6842</span></p>
                <p className="mt-2 font-bold text-gray-600">Informações adicionais:</p>
                <p className="flex justify-between text-gray-600">Diac. Camila: <span>(21) 99363-6957</span></p>
            </p>
        <ButtonLink btnText={"Voltar a tela home"} btnLink={"/"}/>
    </CardFooter>
    </Card>
    )
}