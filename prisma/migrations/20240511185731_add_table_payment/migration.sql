-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "image" TEXT,
    "telefone_emergencia" TEXT,
    "rg" TEXT,
    "cpf" TEXT,
    "data_de_nascimento" TEXT,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "termos_de_uso" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersAnaminese" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "possui_doenca" TEXT,
    "qual_doenca" TEXT,
    "faz_uso_medicamento" TEXT,
    "qual_medicamento" TEXT,
    "alergia_medicamento" TEXT,
    "alergia_qual_medicamento" TEXT,
    "restricao_alimentar" TEXT,
    "quais_alimentos" TEXT,
    "tamanho_blusa" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsersAnaminese_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_cpf_key" ON "Users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "UsersAnaminese_userId_key" ON "UsersAnaminese"("userId");
