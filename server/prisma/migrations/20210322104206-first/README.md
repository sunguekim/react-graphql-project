# Migration `20210322104206-first`

This migration has been generated by sungueKim at 3/22/2021, 7:42:06 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',
    "name" TEXT
);
INSERT INTO "new_User" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20210322104206-first
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,25 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "sqlite"
+  url = "***"
+}
+
+model Post {
+  id        Int     @default(autoincrement()) @id
+  title     String
+  content   String?
+  published Boolean @default(false)
+  author    User?   @relation(fields: [authorId], references: [id])
+  authorId  Int?
+}
+
+model User {
+  id       Int     @default(autoincrement()) @id
+  email    String  @unique
+  password String  @default("")
+  name     String?
+  posts    Post[]
+}
```


