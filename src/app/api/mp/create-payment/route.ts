import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import MercadoPago, { Payment } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import AuthService from "@/auth/service/authService";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    const newPayment = await req.json();
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN_MERCADOPAGO;
    const id = await AuthService.creatRouteId();

    if (!ACCESS_TOKEN) {
        return NextResponse.json({ status: 403, error: 'Não foi possível se conectar ao MercadoPago, tente novamente' });
    }

    const idempotencyKey = uuidv4();
    const client = new MercadoPago({ accessToken: ACCESS_TOKEN, options: { timeout: 5000 } });
    const payment = new Payment(client);

    try {
        console.log('newPayment:', newPayment);

        const paymentResponse = await payment.create({
            body: { ...newPayment },
            requestOptions: {
                idempotencyKey: idempotencyKey
            }
        });

        console.log('paymentResponse:', paymentResponse);

        const paymentPrisma = await prisma.paymentUser.create({
            data: {
                userId: id!,
                paymentId: String(paymentResponse.id),
                paymentStatus: paymentResponse.status!,
                paymentType: paymentResponse.payment_type_id!,
                paymentDescription: 'Retiro Resgatando Anas 2024',
                active: true,
            },
        });

        console.log('paymentPrisma:', paymentPrisma);

        if (paymentResponse.status === "rejected") {
            return NextResponse.json({ message: 'Pagamento Recusado', status: 4003, paymentResponse, paymentPrisma });
        } else {
            return NextResponse.json({ message: 'Pagamento criado com sucesso', status: 201, paymentResponse, paymentPrisma });
        }
    } catch (error) {
        console.error('Erro ao processar o pagamento:', error);
        return NextResponse.json({
            message: 'Erro ao processar o pagamento',
            status: 400,
            error: error
        });
    } finally {
        await prisma.$disconnect();
    }
}