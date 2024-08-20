// service.ts
async function getInfoPayment(id: number) {
  'use server'

  const DATA_SOURCE_URL = 'https://api.mercadopago.com/v1/payments/';
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN_MERCADOPAGO;

  function extractUserPaymentDetails(data: any): UserPaymentDetails {
    const createdAt = new Date(data.date_created);
    const now = new Date();
    const diffInMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);

    let status = data.status;

    if (diffInMinutes > 30 ) {
      status = 'Cancelado';
    }

    return {
      detail: {
        id: data.id,
        issuer_id: data.issuer_id,
        date_approved: data.date_approved,
        date_created: data.date_created,
        date_last_updated: data.date_last_updated,
        date_of_expiration: data.date_of_expiration,
        payment_method_id: data.payment_method_id,
        payment_type_id: data.payment_type_id,
        status: status,
        status_detail: data.status_detail,
        description: data.description,
        installments: data.installments,
        transaction_amount: data.transaction_amount,
        qr_code: data.point_of_interaction?.transaction_data?.qr_code,
        ticket_url: data.point_of_interaction?.transaction_data?.ticket_url,
        qr_code_base64: data.point_of_interaction?.transaction_data?.qr_code_base64,
      },
    };
  }

  const paymentUrl = `${DATA_SOURCE_URL}${id}`;
  const res = await fetch(paymentUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
  });

  const uniquePayment = await res.json();
  const userPaymentDetails = extractUserPaymentDetails(uniquePayment);
  console.log(userPaymentDetails.detail.status)
  return userPaymentDetails;
}

const ServicePayment = {
  getInfoPayment,
};

export default ServicePayment;
