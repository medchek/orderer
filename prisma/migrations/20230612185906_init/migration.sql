-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UNCONFIRMED', 'PROCEEDING', 'SUCCESS', 'CANCELED', 'RETURNED');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "discount" SMALLINT NOT NULL DEFAULT 0,
    "stock" INTEGER NOT NULL,
    "code" VARCHAR(25) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "int" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("int")
);

-- CreateTable
CREATE TABLE "Wilaya" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "arName" VARCHAR(100) NOT NULL,
    "code" SMALLINT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "homePrice" INTEGER NOT NULL DEFAULT 400,
    "officePrice" INTEGER NOT NULL DEFAULT 200,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Wilaya_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "surname" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255),
    "phone" INTEGER NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'UNCONFIRMED',
    "productId" INTEGER NOT NULL,
    "wilayaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_code_key" ON "Product"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Order_code_key" ON "Order"("code");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_wilayaId_fkey" FOREIGN KEY ("wilayaId") REFERENCES "Wilaya"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
