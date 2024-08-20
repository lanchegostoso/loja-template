import AuthService from "@/auth/service/authService";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const id = await AuthService.creatRouteId();
        console.log("ID", id);

        if (id) {
            const payments = await prisma.paymentUser.findMany({
                where: { userId: id },
                select: {
                    id: true,
                    userId: true,
                    paymentId: true,
                    paymentStatus: true,
                    paymentType: true,
                    paymentDescription: true,
                    createdAt: true,
                }
            });

            const formattedPayments = payments.map(payment => {
                let formattedType;
                switch (payment.paymentType) {
                    case 'bank_transfer':
                        formattedType = 'Pix';
                        break;
                    case 'credit_card':
                        formattedType = 'Cartão de Crédito';
                        break;
                    default:
                        formattedType = payment.paymentType;
                }

                let formattedStatus;
                switch (payment.paymentStatus) {
                    case 'pending':
                        formattedStatus = 'Pendente';
                        break;
                    case 'in_process':
                        formattedStatus = 'Em processamento';
                        break;
                    case 'approved':
                        formattedStatus = 'Aprovado';
                        break;
                    case 'rejected':
                        formattedStatus = 'Recusado';
                        break;
                    default:
                        formattedStatus = payment.paymentStatus;
                }

                const createdAt = new Date(payment.createdAt);
                const now = new Date();
                const diffInHours = (now.getTime() - createdAt.getTime()) / (1000 * 60);

                if (diffInHours > 30 && formattedType === 'Pix' && formattedStatus !== 'Aprovado') {
                    formattedStatus = 'Cancelado';
                }
                return { ...payment, paymentType: formattedType, paymentStatus: formattedStatus };
            });

            return NextResponse.json({ payments: formattedPayments, status: 200 });
        }

        return NextResponse.json({ message: 'Usuário ou pagamento não encontrados', status: 400 });
    } catch (error) {
        console.error("Ocorreu um erro:", error);
        return NextResponse.json({ message: 'Ocorreu um erro ao processar a solicitação', status: 500 });
    }
}
