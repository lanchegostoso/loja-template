"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { BsFillTelephoneFill } from "react-icons/bs";

import './termosDeUso.css'

type OnCloseFunction = () => void;
type OnAcceptTermsType = () => void;

interface TermosDeUsoProps {
    onClose: OnCloseFunction;
    onAcceptTerms: OnAcceptTermsType;
    isChecked: boolean;
}

export default function TermosDeUso({ onClose, onAcceptTerms, isChecked: initialIsChecked }: TermosDeUsoProps) {
    const [isChecked, setIsChecked] = useState(initialIsChecked);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        onAcceptTerms();
    };

    useEffect(() => {
        setIsChecked(initialIsChecked);
    }, [initialIsChecked]);
    return (
    <div className="termosDeUsoContainer ">
    <ScrollArea className="h-[80vh] w-full">
    <div  className="flex flex-col align-center gap-4 justify-center p-4 text-gray-900">
        <div>
                <h5 className="font-bold">Comunidade Cristã Terra Fértil</h5>
                <h6 className="font-bold">Endereço:</h6>
                <p>Av. Fuscão, 255 - Autódromo, Nova Iguaçu - RJ, 26042-070</p>
                <p><span className="font-bold">Pastor presidente: </span>Pastor Régis Lima dos Santos</p>
            </div>

        <h6 className="font-bold">CONTRATO DE ADESÃO</h6>

        <p>O presente contrato se refere a informações sobre o Retiro de Mulheres “Descendo do Salto” que acontecerá nos dias 25, 26 e 27 do mês de outubro.</p>
        <p>O valor do evento é R$ 250,00 (duzentos e cinquenta reais).</p>
        <p>As refeições e transporte de ida e volta estão inclusos no valor total do evento.(EMBARQUE E DESEMBARQUE serão feitos na igreja)</p>
        <p>O pagamento poderá ser feito em:</p>

        <ul>
            <li>
            <p className='mark'>●</p>
            <p>
                <span className="font-bold">Pix: </span>Contendo na descrição do comprovante que o pagamento se refere ao Retiro de mulheres 2024.
                O comprovante deverá ser enviado para o WhatsApp de uma das responsáveis pelo retiro, cujo números se encontram no final deste contrato.
            </p>
            </li>
            <li>
            <p className='mark'>●</p>
            <p>
                <span className="font-bold">Cartão de crédito: </span>Compra terá acréscimo da operadora do cartão e poderá ser parcelada.
            </p></li>
        </ul>
        <p>*Obs: o contato das responsáveis está no fim do contrato.</p>

        <p className="font-bold">DEVOLUÇÕES E CANCELAMENTOS</p>
        <ul>
            <li><p className='mark'>●</p><p>Não haverá devolução do valor já pago em caso de desistência ou cancelamento por parte do participante.</p></li>
            <li><p className='mark'>●</p><p>Não haverá devolução de qualquer valor ou reembolso a participante que não comparecer ao evento ou caso a mesma venha desistir não haverá devolução ou ressarcimento das parcelas já pagas.</p></li>
        </ul>
        <p className="font-bold">OBJETOS PESSOAIS</p>
        <p>A participante deverá levar para uso próprio:</p>
        <p><span className="font-bold">Roupa de cama: </span>coberta (coberta, edredom ou lençol para se cobrir) e travesseiro.</p>
        <p><span className="font-bold">Roupas e calçados: </span>dê preferência aos mais confortáveis (calça legging, blusas compridas e bermudas larguinhas e compridas).</p>
        <p><span className="font-bold">OBS: </span>Evite o uso de blusas, saias e shorts curtos, apertados e decotados.</p>
        <p><span className="font-bold">Itens de higiene pessoal e beleza: </span>(pasta e escova de dente, toalha de banho, sabonete, desodorante, perfume, maquiagem, prancha de cabelo, hidratante, entre outros).</p>
        <p><span className="font-bold">MEDICAMENTOS (deverão ser entregues ao chegar): </span>MEDICAMENTOS de uso contínuo para levar em saco separado. Pois, a equipe de enfermagem ficará responsável direto pela administração desses medicamentos. <br></br><br></br> É obrigatória a entrega das receitas médicas de cada medicamento à equipe de enfermagem.</p>
        <p><span className="font-bold"> Bíblia (se tiver)</span></p>
        <p><span className="font-bold">EQUIPAMENTOS ELETRÔNICOS</span> não serão permitidos, exemplos: celulares, relógios e outros aparelhos eletrônicos. Caso esqueça, pedimos à colaboração para entregar à equipe que irá recolher, ficarão guardados e serão devolvidos no encerramento do retiro, na hora de ir embora.</p>
        <p>O Retiro de Mulheres Descendo do Salto não se responsabiliza por quaisquer objetos de valor, roupas, pertences pessoais, equipamentos eletrônicos não entregues, dinheiro e outros que sejam levados pela participante, desobrigando-se de qualquer tipo de reembolso em caso de dano, perda ou extravio. Aconselhamos que tudo seja marcado com a identificação pessoal (nome completo) da participante. Utilize identificação com o nome completo nas malas e bens pessoais para evitar perdas e transtornos.</p>
        <p>O evento Retiro de Mulheres Descendo do Salto se destina a mulheres com idade mínima de 18 anos. As refeições e transporte de ida e volta está incluso no valor total do evento.</p>
        <p><span className="font-bold">EMBARQUE E DESEMBARQUE</span> serão feitos na igreja: Comunidade Cristã Terra Fértil. As participantes deverão estar nesse local no horário a ser informado.</p>
        <p><span className="font-bold">AUTORIZO </span>o uso de minha imagem em todo e qualquer material entre imagens de vídeo, fotos e documentos, para ser utilizada na divulgação em geral do evento.</p>
        <p>A presente autorização é concedida a título gratuito, abrangendo o uso da imagem acima mencionada em todo território nacional, das seguintes formas:</p>
        <ul>
            <li><p>(I) home page;</p></li>
            <li><p>(II) mídia eletrônica, entre outros.</p></li>
        </ul>
        <p>Fica ainda autorizada, de livre e espontânea vontade, para os mesmos fins, a cessão de direitos da veiculação das imagens não recebendo para tanto qualquer tipo de remuneração.</p>

        <div className="flex min-w-[100%] gap-1">
            <span><BsFillTelephoneFill className='w-6 h-6 text-blue900' /></span>
            <div className="flex flex-col gap-2">

                <p className="font-bold">Dúvidas e informações:</p>
                <div>
                    <div className="flex gap-8 justify-between">
                        <p>Pra. Roberta:</p><p>(21) 97026-1802</p>
                    </div>
                    <div className="flex gap-8 justify-between">
                        <p>Pra. Glória:</p><p>(21) 97068-6842</p>
                    </div>
                </div>

                <div>
                    <p className="font-bold">Informações adicionais:</p>
                    <div className="flex gap-8 justify-between">
                        <p>Diac. Camila</p><p>(21) 99363-6957</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex items-center space-x-2">
            <input type="checkbox"
            className="w-6 h-6 border-blue900 checked:bg-blue900"
            id="terms"
            name='termos_de_uso'
            onChange={handleCheckboxChange}
            checked={isChecked}
            />
            <label
                htmlFor="terms"
                className="font-bold text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                <p>Clique aqui para declarar que leu e aceitou os termos de uso</p>
            </label>
        </div>
        <Button className="bg-success700 text-white" onClick={onClose} disabled={!isChecked}>Aceitar Termos</Button>
    </div>
    </ScrollArea>

</div>

)
}