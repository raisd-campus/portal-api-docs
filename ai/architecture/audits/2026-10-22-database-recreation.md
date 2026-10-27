# Database recreation check — 22 October 2026

Operator demonstration of Portal API `npm run db:migrate` on an empty local database, followed by `npm run db:seed`. Published page: [database recreation report](../../../reports/database-recreation-2026-10-22/index.html). Command transcript: [execution.log](../../../reports/database-recreation-2026-10-22/execution.log).

The check used only `schema_recreate_20261022` on `127.0.0.1:5432` (PostgreSQL 16.14, Node v24.15.0), from 06:47:11 to 06:47:15 Australia/Sydney. The database was dropped afterward.

First migrate applied 9 migrations in 1 second: 113 tables, 4 views, 118 indexes, and no fixture rows. Second migrate reported `schema is current`. Seed then loaded schema version 4: 3,214 rows in 99 collection tables, including 13 student profiles, 1 programme and 18 user accounts. Session, artifact, community-chat and University Flows tables remained. The seed notice `unversioned to 4` is the empty `portal_meta` left by migrate before the first fixture row.

Two CLI corrections were required before that successful run. Schema SQL was separated from Applicant imports, and the database CLI now defines `import.meta.env` for student-portal fixture modules. No hosted database was changed.
