# Migration `20210401133608-pro2`

This migration has been generated by sungueKim at 4/1/2021, 10:36:08 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_authorId_fkey"

ALTER TABLE "public"."Profile" DROP COLUMN "loction",
ADD COLUMN "location" text   

ALTER TABLE "public"."Tweet" DROP COLUMN "createdAt",
ADD COLUMN "title" text   NOT NULL ,
ALTER COLUMN "content" DROP NOT NULL

DROP TABLE "public"."Post"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210401131522-profile..20210401133608-pro2
--- datamodel.dml
+++ datamodel.dml
@@ -3,16 +3,15 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
-model Post {
+model Tweet {
   id        Int     @default(autoincrement()) @id
   title     String
   content   String?
-  published Boolean @default(false)
   author    User?   @relation(fields: [authorId], references: [id])
   authorId  Int?
 }
@@ -20,27 +19,19 @@
   id       Int     @default(autoincrement()) @id
   email    String  @unique
   password String  @default("")
   name     String?
-  posts    Post[]
+  tweets    Tweet[]
   Profile Profile?
-  Tweet Tweet[]
 }
 model Profile{
   id Int @id @default(autoincrement())
   createdAt DateTime @default(now())
   bio String?
-  loction String?
+  location String?
   website String?
   avatar String?
   userId Int? @unique
   User User? @relation(fields: [userId],references:[id])
 }
-model Tweet{
-  id Int @id @default(autoincrement())
-  createdAt DateTime @default(now())
-  content String
-  author User? @relation(fields: [authorId],references:[id])
-  authorId Int?
-}
```

