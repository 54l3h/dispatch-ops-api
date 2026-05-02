/*
  Warnings:

  - You are about to drop the column `max_leads_per_month` on the `subscription_plans` table. All the data in the column will be lost.
  - You are about to drop the column `max_members` on the `subscription_plans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subscription_plans" DROP COLUMN "max_leads_per_month",
DROP COLUMN "max_members";
