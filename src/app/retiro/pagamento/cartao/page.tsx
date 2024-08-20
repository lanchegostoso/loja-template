'use client'
import { useState, useEffect } from "react";
import { BsCreditCard2Back } from "react-icons/bs";
import { HeaderColumn } from "@/components/shared/header-column/header-column";
import './style.css';

export default function PagamentoCartao() {
  const [url, setUrl] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handlePayment = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/mp/create-preference', {
          method: 'POST',
        });

        const data = await response.json();
        console.log(data)

        if (data.init_point) {
          console.log(data.init_point)
          setUrl(data.init_point);
        } else {
          console.error('Erro ao criar a preferência de pagamento:', data.error);
        }
      } catch (error) {
        console.error('Erro ao processar o pagamento:', error);
      } finally {
        setLoading(false);
      }
    };

    handlePayment();
  }, []);

  return (
    <div className="w-full">
      <HeaderColumn icon={BsCreditCard2Back} iconSize={45} text="Efetuar pagamento via cartão de crédito" />
      <div className="flex flex-col min-h-72 items-center justify-center text-center">
        {loading ? (
          <div className="text-center">
            <p>Gerando link de pagamento</p>
            <p>Processando.....</p>
          </div>
        ) : (
          url ? (
            <a  className={`w-full`} href={url} target="_blank" rel="noopener noreferrer">
              <button className={`w-full py-4 rounded bg-success700`}>Ir para pagina de pagamento</button>
            </a>
          ) : (
            null
          )
        )}
      </div>
    </div>
  );
}
{/* <iframe
src={url}
style={{ width: '100%', height: '600px', border: 'none' }}
title="Mercado Pago Checkout"
/> */}