import { PaymentCreateRequest } from 'mercadopago/dist/clients/payment/create/types';

import { MercadoPagoConfig, Payment } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import  AuthService  from '../../auth/service/authService'

const prisma = new PrismaClient();

async function createPaymentPix(){
    'use server';

    const userId = String(await AuthService.getUserId());
    const user = await prisma.users.findFirst({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                telefone: true,
                type: true,
            }
    });
 if (user){
    const name = user.name;
    const email = user.email;
    const phone = user.telefone;
    const description = 'Retiro Resgatando Anas 2024';
    const payment_method_id = 'pix';
    const transaction_amount = 250;
    const installments = 1;

    const paymentCreateRequest: PaymentCreateRequest = {
        description,
        payment_method_id,
        transaction_amount,
        installments,
        payer:{
            email,
            first_name: name,
            phone:{
                number: `${phone}`,
            },
        },
    }
    const idempotencyKey = uuidv4();
    const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN_MERCADOPAGO!, options: { timeout: 5000, idempotencyKey: idempotencyKey } });
    const payment = new Payment(client);

    const response = await payment.create({ body: paymentCreateRequest });
    const { id , status , payment_type_id} = response;

    console.log(response)
    
    await prisma.paymentUser.create({
        data: {
            userId,
            paymentId: String(id),
            paymentStatus: status!,
            paymentType: payment_type_id!,
            paymentDescription: description,
            active : true,
        },
    });
    redirect(`/retiro/pagamento/pix/${id}`);
}

}

const PaymentActions = {
    createPaymentPix,
}



export default PaymentActions

