# Lesotho old-CMS mock MySQL

**Status:** Local + UltaHost Demo fixture (CAP-53 Integration)  
**Schema:** `campus2_lesotho` (Vara structure dump 5 Oct 2026)  
**Browse:** [https://db-admin.raisd.co](https://db-admin.raisd.co) → server **Lesotho CMS mock (MySQL)**  
**Local pack (outside git):** `raisd/_local/cms-mock-lesotho/`  
**Related:** [architecture/cms-bridge.md](../architecture/cms-bridge.md) · [cms-bridge.md](cms-bridge.md) (service) · [old-cms-lesotho.md](old-cms-lesotho.md) · [lesotho-cap53-read-adapter.md](lesotho-cap53-read-adapter.md) · [lesotho-db-gap.md](lesotho-db-gap.md)

**Consumer:** in-cluster `cms-bridge` reads R1 surfaces via `LESOTHO_MYSQL_URL` → `mysql-lesotho-mock:3306/campus2_lesotho`.

## Purpose

Run a **structure-faithful** Lesotho old CMS database with **sanitized mock rows** so Portal API / CMS bridge / db-admin work can exercise CAP-53 R1 reads without Live campus MySQL or real student PII.

| Layer | Source |
|---|---|
| Tables / views / procedures | `_local/lesotho-cms-2026-10-05/sql/` — structure only |
| Mock data | `_local/cms-mock-lesotho/seed/*.sql` — synthetic `@raisd.demo` students |

Never commit the dump, Docker/k8s volume, or live PII into `control-plane`.

## UltaHost (Demo)

| Setting | Value |
|---|---|
| Namespace | `campus` |
| Service | `mysql-lesotho-mock:3306` |
| Database | `campus2_lesotho` |
| App user | `cms_bridge` (secret `mysql-lesotho-mock-env`) |
| Manifests | `gitops/apps/mysql-lesotho-mock/deployment.yaml` |
| Credentials file | `.credentials/mysql-lesotho-mock.env` (gitignored) |

db-admin lists this as server id `lesotho-cms-mock` via `DB_SERVERS` on secret `db-admin-env`.

## Local bring-up

```bash
cd ../_local/cms-mock-lesotho   # sibling of control-plane under raisd/
cp -n .env.example .env         # optional
./scripts/up.sh                 # docker compose + restore + seed
```

| Setting | Value |
|---|---|
| Host | `127.0.0.1` |
| Port | `3307` (localhost bind only) |
| App user | `cms_bridge` / `raisd_mock_bridge` |

```bash
mysql -h 127.0.0.1 -P 3307 -ucms_bridge -praisd_mock_bridge campus2_lesotho
```

## Seed contents (synthetic)

| Object | Mock rows | Notes |
|---|---|---|
| `f_school` | 5 faculties | FICT, FBMG, FABE, FCM, FFLD |
| `f_program` | 10 programmes | BSCIT, BSCBIT, DBIT, BBA, BAJ, BARCH, BAFASH, DIPMKT, BAMED, DIT |
| `f_module` | 15 modules | DIG101…FIN210 |
| `acad_calendar` | 4 terms | 2025–2026 intakes |
| `r_assistprovider` | `nmds`, `self`, `corp` | NMDS / self / corporate |
| `portal_student_*_lesotho` | 24 students | IDs 50001–50024; emails `*@raisd.demo` |
| `r_student` / `r_stdpersonal` / `r_stdprogram` / `r_stdsemester` / `r_stdmodule` | 24 / 24 / 24 / 24 / 72 | Core CMS tables (same IDs) |
| Portal modules | 72 rows | 3 modules per student |
| Attendance strips | 11 | Active current-term sample |

Most of the ~369 dump tables stay empty on purpose (structure-only). Seeded surfaces are the portal read path + core student registry tables above.

```sql
SELECT StudentNo, StudentName, StdEmail, LatestTerm
FROM portal_student_lesotho
ORDER BY StudentID;
```

## Verified restore counts (21 Nov 2026)

| Object | Count |
|---|---|
| Base tables | 369 |
| Views | 351 (multi-pass load) |
| Routines | 52 (incl. `api_student_*` / `api_faculty_*`) |
| Mock portal students | 24 (sample seed) |
| Portal module rows | 72 |

## Ops notes

- Views load in multiple passes (dependency order). Procedure dump is wrapped with `DELIMITER` + DEFINER rewrite.
- Re-seed is idempotent for the mock ID ranges (DELETE then INSERT).
- Local tear down: `docker compose down -v`. VPS: `kubectl -n campus delete -f gitops/apps/mysql-lesotho-mock/deployment.yaml` (destroys PVC if deleted).

