-- CreateTable
CREATE TABLE "visitante" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "gender" TEXT,
    "age" INTEGER,
    "address" TEXT,
    "cityAndState" TEXT,
    "religion" TEXT,
    "smallGroup" TEXT,
    "bibleStudy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visitsCount" INTEGER DEFAULT 1,

    CONSTRAINT "visitante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visita" (
    "id" TEXT NOT NULL,
    "visitDate" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "visitanteId" TEXT,

    CONSTRAINT "visita_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "visita" ADD CONSTRAINT "visita_visitanteId_fkey" FOREIGN KEY ("visitanteId") REFERENCES "visitante"("id") ON DELETE SET NULL ON UPDATE CASCADE;
