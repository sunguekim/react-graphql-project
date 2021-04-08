# Migration `20210322104726-second`

This migration has been generated by sungueKim at 3/22/2021, 7:47:26 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Post" (
"id" SERIAL,
"title" text   NOT NULL ,
"content" text   ,
"published" boolean   NOT NULL DEFAULT false,
"authorId" integer   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."User" (
"id" SERIAL,
"email" text   NOT NULL ,
"password" text   NOT NULL DEFAULT E'',
"name" text   ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

ALTER TABLE "public"."Post" ADD FOREIGN KEY("authorId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210322104206-first..20210322104726-second
--- datamodel.dml
+++ datamodel.dml
@@ -2,10 +2,10 @@
   provider = "prisma-client-js"
 }
 datasource db {
-  provider = "sqlite"
-  url = "***"
+  provider = "postgresql"
+  url = "***"
 }
 model Post {
   id        Int     @default(autoincrement()) @id
```

