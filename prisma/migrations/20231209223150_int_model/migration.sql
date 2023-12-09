/*
  Warnings:

  - You are about to alter the column `age` on the `visitante` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_visitante" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "visitsCount" INTEGER DEFAULT 1,
    "phone" TEXT,
    "address" TEXT,
    "cityAndState" TEXT,
    "age" INTEGER,
    "gender" TEXT,
    "religion" TEXT,
    "smallGroup" TEXT,
    "bibleStudy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_visitante" ("address", "age", "bibleStudy", "cityAndState", "createdAt", "gender", "id", "name", "phone", "religion", "smallGroup", "updatedAt", "visitsCount") SELECT "address", "age", "bibleStudy", "cityAndState", "createdAt", "gender", "id", "name", "phone", "religion", "smallGroup", "updatedAt", "visitsCount" FROM "visitante";
DROP TABLE "visitante";
ALTER TABLE "new_visitante" RENAME TO "visitante";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
