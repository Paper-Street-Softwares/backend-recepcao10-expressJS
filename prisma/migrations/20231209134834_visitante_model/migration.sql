-- CreateTable
CREATE TABLE "visita" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "visitDate" TEXT,
    "visitanteId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "visita_visitanteId_fkey" FOREIGN KEY ("visitanteId") REFERENCES "visitante" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_visitante" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "cityAndState" TEXT,
    "age" TEXT,
    "gender" TEXT,
    "religion" TEXT,
    "smallGroup" TEXT,
    "bibleStudy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_visitante" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "visitante";
DROP TABLE "visitante";
ALTER TABLE "new_visitante" RENAME TO "visitante";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
