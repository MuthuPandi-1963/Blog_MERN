/*
  Warnings:

  - You are about to drop the column `slug` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the `BlogTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."BlogTag" DROP CONSTRAINT "BlogTag_blogId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BlogTag" DROP CONSTRAINT "BlogTag_tagId_fkey";

-- DropIndex
DROP INDEX "public"."Tag_slug_key";

-- AlterTable
ALTER TABLE "public"."Blog" ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "status" "public"."BlogStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "public"."Tag" DROP COLUMN "slug";

-- DropTable
DROP TABLE "public"."BlogTag";

-- CreateTable
CREATE TABLE "public"."_BlogToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BlogToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BlogToTag_B_index" ON "public"."_BlogToTag"("B");

-- AddForeignKey
ALTER TABLE "public"."Blog" ADD CONSTRAINT "Blog_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BlogToTag" ADD CONSTRAINT "_BlogToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BlogToTag" ADD CONSTRAINT "_BlogToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
