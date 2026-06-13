-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDENTE', 'APROVADO', 'REJEITADO');

-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "status" "RegistrationStatus" NOT NULL DEFAULT 'PENDENTE';
