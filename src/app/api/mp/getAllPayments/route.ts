import { NextResponse } from "next/server";

const SEARCH_URL = 'https://api.mercadopago.com/v1/payments/search';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_MERCADOPAGO;

export async function GET() {
    const queryParams = new URLSearchParams({
      begin_date: 'NOW-365DAYS',
      end_date: 'NOW',
    });

    const url = `${SEARCH_URL}?${queryParams.toString()}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (res.status === 404) {

      return( new Response('Not Found', { status: 404 }));
    }

    const payments = await res.json();

    const filteredData = payments.results.map((payment:any) => {
      return {
        operation_type: payment.operation_type,
        qr_code: payment.point_of_interaction.transaction_data?.qr_code,
        ticket_url: payment.point_of_interaction.transaction_data?.ticket_url,
        qr_code_base64: payment.point_of_interaction.transaction_data?.qr_code_base64,
        payer: {
          identification: payment.payer?.identification?.number,
          phone_area_code: payment.payer?.phone?.area_code,
          phone_number: payment.payer?.phone?.number,
          phone_extension:payment.payer?.phone?.extension,
          last_name: payment.payer?.last_name,
          id: payment.payer?.id,
          type: payment.payer?.type,
          email: payment.payer?.email,
        },
        transaction_details: {
          transaction_id: payment.transaction_details?.transaction_id,
          total_paid_amount: payment.transaction_details?.total_paid_amount,
          installment_amount: payment.transaction_details?.installment_amount,
        },
        date_of_expiration: payment.date_of_expiration,
        payment_type_id: payment.payment_type_id,
        payment_method: {
          issuer_id: payment.payment_method?.issuer_id,
          id: payment.payment_method?.id,
          type: payment.payment_method?.type,
        },
        status_detail: payment.status_detail,
        status: payment.status,
        transaction_amount: payment.transaction_amount,
        description: payment.description,
        payment_method_id: payment.payment_method_id,
      };
    });

    return NextResponse.json(filteredData);
  }