const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.paymentUser.updateMany({
    where: {},
    data: {
      paymentStatus: 'pending', // Valor padrão para registros existentes
      paymentDescription: 'Retiro Resgatando Anas 2024', // Valor padrão para registros existentes
      active: true // Valor padrão para registros existentes
    },
  });

  console.log('Todos os registros foram atualizados com valores padrão.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
