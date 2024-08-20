import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import MercadoPago, { Preference } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import AuthService from "@/auth/service/authService";

const prisma = new PrismaClient();
const url = process.env.BASE_URL;

export async function POST() {
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN_MERCADOPAGO;
    const id = await AuthService.creatRouteId();

    if (id) {
        const user = await prisma.users.findFirst({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                telefone: true,
                type: true,
            }
        });

        if (!user) {
            return NextResponse.json({ status: 404, error: 'Usuário não encontrado' });
        }

        const telefone = user.telefone;
        const areaCode = telefone!.slice(0, 2);
        const number = telefone!.slice(2);

        if (!ACCESS_TOKEN) {
            return NextResponse.json({ status: 403, error: 'Não foi possível se conectar ao MercadoPago, tente novamente' });
        }

        const idempotencyKey = uuidv4();
        const client = new MercadoPago({ accessToken: ACCESS_TOKEN, options: { timeout: 5000 } });
        const preference = new Preference(client);

        try {
            const paymentResponse = await preference.create({
                body: {
                        items: [
                            {
                                id: 'RetiroAnas2024',
                                title: 'Retiro Resgatando Anas 2024',
                                description: 'Igresso para retiro de 3 dias em uma chacara em Nova Iguaçú',
                                picture_url: 'https://resgatando-anas.vercel.app/_next/image?url=%2Fimg%2FLogoResgatandoAnas.png&w=64&q=75',
                                category_id: 'Ingresso',
                                quantity: 1,
                                unit_price: 250,
                            }
                        ],
                        payer: {
                            name: user.name,
                            phone: {
                                area_code: areaCode,
                                number: number
                            },
                        },
                        auto_return: 'all',
                        back_urls: {
                            success: `${url}/retiro/pagamento/status/aprovado`,
                            failure: `${url}/retiro/pagamento/status/cartao-recusado`,
                            pending: `${url}/retiro/pagamento/status/pendente`,
                          },
                          payment_methods: {
                              excluded_payment_methods: [
                                  { id: "paypal" },
                                  { id: "atm" },
                                  { id: "ticket" },
                                  { id: "bank_transfer" },
                                  { id: "bolbradesco" },
                                  { id: "pec" },
                                  { id: "debit_card" },
                                  { id: "prepaid_card" },
                                  { id: "money_order" },
                                  { id: "pix" },
                              ]
                          }
                },
                requestOptions: { idempotencyKey: idempotencyKey }
            });

            console.log('paymentResponse:', paymentResponse);
            return NextResponse.json(paymentResponse);

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
}
