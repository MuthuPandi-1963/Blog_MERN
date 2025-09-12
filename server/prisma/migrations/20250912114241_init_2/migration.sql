/*
  Warnings:

  - You are about to drop the column `excerpt` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `BlogAnalytics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlogCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."BlogAnalytics" DROP CONSTRAINT "BlogAnalytics_blogId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BlogCategory" DROP CONSTRAINT "BlogCategory_blogId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BlogCategory" DROP CONSTRAINT "BlogCategory_categoryId_fkey";

-- DropIndex
DROP INDEX "public"."Blog_slug_key";

-- DropIndex
DROP INDEX "public"."Category_slug_key";

-- AlterTable
ALTER TABLE "public"."Blog" DROP COLUMN "excerpt",
DROP COLUMN "isDeleted",
DROP COLUMN "publishedAt",
DROP COLUMN "slug",
DROP COLUMN "status";

-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "slug";

-- DropTable
DROP TABLE "public"."BlogAnalytics";

-- DropTable
DROP TABLE "public"."BlogCategory";
