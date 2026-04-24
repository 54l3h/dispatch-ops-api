/*
  Warnings:

  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `hashedRefreshToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `tokenVersion` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "hashedRefreshToken",
DROP COLUMN "tokenVersion",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hashed_refresh_token" TEXT,
ADD COLUMN     "token_version" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
