# Botswana — DTEF scholarship / sponsorship sync with TEF.gov.bw

**Source package:** `CMS_Botswana_Source_Codes_&_DB_Structure_24_09_2026` (24 September 2026)\
**Campus:** LUCT Botswana CMS `BWA-GBE` · DB `cmsbotswana`\
**Evidence files (not committed):**

| Desk screen | Path |
|---|---|
| Active scholarship applications (list) | `botswana/campus/registry/r_scholarshipapplist.php` |
| Dropout scholarship applications (list) | `botswana/campus/registry/r_dropout_scholarshipapplist.php` |
| Sync trigger (active edit) | `botswana/campus/registry/r_scholarshipappedit.php` |
| Sync trigger (dropout edit) | `botswana/campus/registry/r_dropout_scholarshipappedit.php` |
| List SQL (active) | `r_scholarshipappinfo.php` → view `r_scholarshipapp_v` |
| List SQL (dropout) | `r_dropoutscholarshipappinfo.php` → `r_scholarshipapp` ⟕ `w_student_sview` |

This capability is **Botswana-specific**. Cyberjaya has scholarship / assist tables but **no** equivalent government TEF admission POST in the Cyberjaya dump. Treat as an [M5](../../sdd/03-delivery-milestones.md#m5) campus-local integration pattern for [CAP-48](../../sdd/11-capability-catalog.md#cap-48) and distributed CMS feature flags — not as Cyberjaya launch SoR work ([ADR-1](../architecture/overview.md)).

**Do not commit** PHP sources, TEF Basic Auth credentials, CSRF tokens, or live student payloads. Credentials observed in the dump must be rotated out-of-band; this document records **shape only**.

**Pages:** [`docs/diagrams/old-cms-botswana/index.html#dtef`](../../diagrams/old-cms-botswana/index.html#dtef) (combined into Botswana end-to-end flow; legacy URL `dtef-scholarship-sync.html` redirects there)

---

## 1. Business process (functional specification)

### 1.1 Purpose

Registry staff prepare **student admission / programme-of-study records** for Botswana government tertiary financing (**DTEF** — Department of Tertiary Education Financing) and **submit them to the national TEF portal** (`tef.gov.bw`). The CMS is the campus system of record for the submission queue; TEF is the government system of record for financing decisions.

### 1.2 Actors

| Actor | Role |
|---|---|
| Registry officer | Creates / edits scholarship application rows; sets status to **Sent by Registry (31)** to push to TEF |
| TEF.gov.bw (Drupal HAL API) | Accepts `program_of_study` admissions; returns success / duplicate / error |
| DTEF (government) | Downstream approval / rejection (status **34** / **35** in CMS — typically updated after TEF outcome, not by the POST itself) |
| Bursary / finance desks | Consume DTEF assist billing / scholarship status via `b_stdassist*`, `dtef_scholarship` view, reports (separate from the POST path) |

### 1.3 Process steps

```text
1. Registry builds or edits a row in r_scholarshipapp
   (national ID, names, institution + programme codes, dates, cost, …)
2. Officer sets app_status = 31 ("Sent by Registry") and saves (edit screen)
3. CMS obtains CSRF session token from TEF, then POSTs HAL+JSON admission
4. On HTTP/API success (or known "Duplicate Student Admission!"):
     app_status → 32 ("Successfully Sent to DTEF"), remark → SUCCESS!
   On failure:
     app_status → 33 ("Failed"), remark ← API error text; UI alert
5. Later outcomes (outside this POST path in code reviewed):
     34 Approved by DTEF · 35 Rejected by DTEF
6. Parallel finance life-cycle uses assist tables / dtef_scholarship view
   for term billing — not the same code path as the admission POST
```

### 1.4 Status vocabulary (`app_status`)

| Code | Meaning (from list UI / edit comments) | Sync behaviour |
|---:|---|---|
| 30 | Pending | No TEF call |
| 31 | Sent by Registry | **Triggers** TEF POST on save |
| 32 | Successfully Sent to DTEF | Post succeeded (or duplicate treated as OK) |
| 33 | Failed | Post failed |
| 34 | Approved by DTEF | Outcome (list filter); dropout update skips rows already `34` |
| 35 | Rejected by DTEF | Outcome |

List filters on the active desk expose 30 / 32 / 33 / 34 / 35 (duplicate key `32` in the PHP array is a coding smell, not a second status).

### 1.5 Two Registry desks

| Desk | List | Edit | Data surface |
|---|---|---|---|
| Active scholarship apps | `r_scholarshipapplist.php` | `r_scholarshipappedit.php` | View `r_scholarshipapp_v` (`r_scholarshipapp` ⋈ `r_student` on `IDNumber = StudentNo`) |
| Dropout scholarship apps | `r_dropout_scholarshipapplist.php` | `r_dropout_scholarshipappedit.php` | `r_scholarshipapp` LEFT JOIN `w_student_sview`; CSV migrator upload helper; requires non-empty `programCost` before POST |

Both desks write the **same** table `r_scholarshipapp` and call the **same** TEF endpoints. Dropout edit additionally avoids overwriting rows with `app_status = 34` (`WHERE schctr = … AND app_status <> 34`).

### 1.6 Related CMS processes (not the TEF POST)

- **Assist / sponsorship finance:** `b_stdassistprog`, `b_stdassistsem`, provider `r_assistprovider` (`AssistProviderCode = 'DTEF'`), function `getSCholarshipStatus`, view `dtef_scholarship` (term-scoped reporting).
- **Billing artefacts:** historical `DTEF_*` / `DTEFBilling_*` scratch tables; bursary `generatedletter/DTEF_*.xls|pdf`; letter template `dtefinvoice.rtf`.
- **Dropout analytics:** view `r_studentdtefdropoutview` + list `r_studentdtefdropoutviewlist.php`.

---

## 2. Technical analysis — third-party API

### 2.1 External system

| Item | Value |
|---|---|
| Host | `https://tef.gov.bw` |
| Product shape | Drupal REST / HAL+JSON (`application/hal+json`) |
| CSRF token | `GET /rest/session/token` |
| Admission write | `POST /api/post/studentadmissions?_format=hal_json` |
| Auth | HTTP Basic (credentials in PHP — **do not republish**) + `X-CSRF-Token` from token GET |
| Content type | `application/hal+json` |
| Entity type | `program_of_study` (`type[].target_id`) |

### 2.2 Trigger condition

Inside `EditData()` on save, **only when** `$x_app_status == "31"` (and for dropout edit, `!empty($x_programCost)`). The TEF call runs **before** the local `UPDATE r_scholarshipapp`.

### 2.3 Payload mapping (CMS → TEF)

| TEF HAL field | CMS column / source | Notes |
|---|---|---|
| `type.target_id` | constant `program_of_study` | Drupal bundle |
| `title.value` | `title` | Dropout path currently posts `null` for title |
| `id.value` | `IDNumber` | National / student identity number |
| `surname.value` | `Surname` | |
| `firstname.value` | `Firstname` | |
| `institution.value` | `TrainintIstitutionCode` | Typo preserved in column name |
| `institution_program_code.value` | `InstitutionProgramcode` | |
| `program_name.value` | `program_name` | |
| `program_duration.value` | `durationOFStudy` | |
| `start_date.value` | `commencementDate` | Re-formatted `d M Y` (comment: Moses, 05 Apr 2023) |
| `completion_date.value` | `expectedCompletionDate` | Same date format |
| `entry_level.value` | `levelofEntry` | |
| `cost.value` | `programCost` | Required on dropout path |

Also persisted locally on send: `date_sent`, `staffid` (session user), `remark`.

### 2.4 Success / failure handling

- Hard error constant: `RECORD_EXIST = 'Duplicate Student Admission!'` — treated as **non-fatal** (`$apiError = false`) so status can still move to **32**.
- Other API `error` or curl errno → **33** + alert *“There was an issue with Submitting this Application!.Please Contact Support”*.
- Debug `var_dump` of curl handles remains in production code (ops risk).

### 2.5 Primary table `r_scholarshipapp`

| Column | Role |
|---|---|
| `schctr` | PK |
| `applicationid` | Linked application id |
| `AssistProviderCode` | Provider code (e.g. DTEF) |
| `title`, `IDNumber`, `Surname`, `Firstname` | Person |
| `TrainintIstitutionCode`, `InstitutionProgramcode`, `program_name` | Programme identity for TEF |
| `levelOfStudy`, `durationOFStudy`, `commencementDate`, `expectedCompletionDate`, `levelofEntry`, `programCost` | Study / cost |
| `app_status` | Workflow + sync result |
| `date_sent`, `staffid`, `remark` | Audit / TEF response text |

Mirrors / scratch: `r_scholarshipapp_bots`, dated copies, `failed_DTEF` (module-failure analytics — not the admission POST log).

### 2.6 Security & Raisd implications

1. **Credentials in PHP source** — rotate TEF Basic Auth; never copy into Portal API or git.
2. **Campus-local integration** — gate behind campus feature flag / control-plane config ([distributed CMS target](../architecture/distributed-cms-target.md)); Cyberjaya must not inherit this endpoint.
3. **Portal API boundary** — if Raisd ever exposes scholarship submission, the Portal API must own the TEF client (server-side), not browser → TEF.
4. **Idempotency** — duplicate admission is special-cased; design Raisd retries around TEF’s duplicate semantics.
5. **PII** — national ID + personal names leave the campus boundary; document DPIA / government MoU before re-implementing.

---

## 3. Raisd / CAP mapping

| Concern | Mapping |
|---|---|
| Staff assign / review scholarships | [CAP-48](../../sdd/11-capability-catalog.md#cap-48) — Botswana SoR today is LUCT registry + bursary; Raisd staff portal later |
| Student view of awards | Student portal finance scholarships (read-only) — no TEF POST from student UX |
| M5 expansion | Re-inventory this TEF contract per campus; do not assume Cyberjaya parity |
| Control plane | Feature flag + secret store for TEF base URL / credentials per tenant |

---

## Related

- Botswana inventory: [old-cms-botswana.md](old-cms-botswana.md)
- CAP comparison: [cms-feature-comparison.md](cms-feature-comparison.md)
- GitHub Pages section: [index.html#dtef](../../diagrams/old-cms-botswana/index.html#dtef)
