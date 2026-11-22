# CMS bridge service

**Status:** Demo / Integration — mock mode against Lesotho mock MySQL.  
**Repo:** [`raisd-campus/cms-bridge`](https://github.com/raisd-campus/cms-bridge)  
**In-cluster:** `http://cms-bridge.campus.svc.cluster.local`  
**Design:** [architecture/cms-bridge.md](../architecture/cms-bridge.md) · https://docs.raisd.co/diagrams/cms-bridge/  
**Contract:** [`openapi-cms-bridge.yaml`](../../../openapi-cms-bridge.yaml)  
**Swagger:** https://docs.raisd.co/openapi-cms-bridge.html · in-cluster `/bridge/v1/docs`

## Role

Private CAP-53 connector between Portal API and per-campus mock (later live) CMS MySQL. Portals never call it.

```text
Portal API
    │  Authorization: Bearer $CMS_BRIDGE_TOKEN
    ▼
cms-bridge  ──►  mysql-lesotho-mock (campus2_lesotho)
```

## Lesotho R1 reads

| Operation | Source |
|---|---|
| `student.profile` | `portal_student_lesotho` (+ optional `api_student_login_info`, password stripped) |
| `student.programs` | `portal_student_program_lesotho` |
| `student.semesters` | `portal_student_program_semester_lesotho` |
| `student.modules` | `portal_student_program_semester_module_lesotho` |
| `student.attendance` | `portal_student_program_semester_module_attendance_lesotho` |
| `GET …/students/{studentNo}` | profile projection |

Writes return `acknowledged: false` / `writes_not_enabled` until W1.

## Deploy

```bash
# control-plane
npm run deploy:vps -- cms-bridge
```

Secrets (never commit): `.credentials/cms-bridge-api.token`, `.credentials/mysql-lesotho-mock.env`.

## Smoke (in-cluster)

```bash
kubectl -n campus exec deploy/cms-bridge -- \
  wget -qO- http://127.0.0.1:8095/bridge/v1/health
```
