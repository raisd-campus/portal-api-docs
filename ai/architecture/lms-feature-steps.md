# Raisd LMS — step-by-step features (functionality · use · integration)

**As of:** 31 October 2026  
**Status:** Research / documentation — **Proposed**. Demo ≠ Live.  
**Human page:** [`docs/diagrams/lms-reference/features.html`](../../diagrams/lms-reference/features.html)  
**Wireframes:** Faid design-system **0.19.8** lo-fi frames on every step ([DS pack](../../design-system/candidates/0.19.8/), styles `diagrams/lms-reference/wireframes.css`). CMS SoR steps use a light non-DS mock.  
**Inspiration:** Every feature and step states primary vocabulary source — **Moodle**, **Google Classroom**, **Both**, or **Raisd-native** (SSO / CMS SoR / Portal API). Page opens with a Mermaid **mind map** of F01–F15.  
**Binding:** [lms-moodle-classroom-map.md](lms-moodle-classroom-map.md) · [lms.md](lms.md) · [lms-schema.md](../backend/lms-schema.md) · [classrooms.md](../backend/classrooms.md) · [reusable-materials.md](../backend/reusable-materials.md) · SDD-11 · BASE-44 · [ai-ui-guidance.md](../design/ai-ui-guidance.md)  

## Location legend (where the step sits)

| Code | Host / surface | Role |
|---|---|---|
| **STU** | `student.{slug}.raisd.co` | Enrolled student learning surface |
| **LEC** | `lecturer.{slug}.raisd.co` | Teaching staff Classrooms / Materials |
| **STA** | `staff.{slug}.raisd.co/admin` | Staff Admin desks (Teaching / Registry / …) |
| **CMS** | Campus CMS (SoR) | Enrolment, catalogue, published results (ADR-1) |
| **API** | Portal API | Only browser→backend path |
| **SSO** | `sso.raisd.co` | Sign-in / session |

LMS is **not** a fifth portal. Every learning step is a role surface through **API**.

## Integration spine (every feature)

```
Actor (STU|LEC|STA) → Portal UI → Portal API → Neon Demo graph / memory overlay
                              ↘ CMS SoR reads (enrolment, published grades) when required
```

- AuthN: SSO session → API. AuthZ: server-enforced by role + exact offering / registration.
- Demo mutations may be session- or process-memory only; do not claim Live persistence.
- Catalogue of callable LMS methods: `GET /v1/meta/lms` (and Classrooms meta when enabled).

---

## Feature catalogue

| ID | Feature | CAP | Primary location | Demo today |
|---|---|---|---|---|
| F01 | Open course / class workspace | 44 | STU Materials · LEC Classrooms | Partial |
| F02 | Roster / enrolment (SoR) | CMS | CMS · STA Access · API read | CMS / Access |
| F03 | Teaching weeks / topics | 27 | LEC Materials · STU week list | Partial |
| F04 | Browse & open materials | 17,18,22 | STU · LEC (read-only Materials) | Partial |
| F05 | Assignment brief | 19 | LEC Classrooms Assessments · STU item | Partial |
| F06 | Submit / unsubmit | 20 | STU assignment | Demo metadata / Classrooms bytes overlay |
| F07 | Mark, feedback, return | 28 | LEC Classrooms · STU feedback | Draft/publish Demo (Classrooms) |
| F08 | Gradebook / results | 13 | STU results · LEC marks · CMS publish | Demo surface |
| F09 | Attendance | 12 | LEC Attendance · STU view | Demo |
| F10 | Timetable / calendar | 11 | STU · LEC Today/All | Demo |
| F11 | Discussion / Community | 25 | STU/LEC Community panel | Demo |
| F12 | Live class join | 26 | STU/LEC (proposed) | Gap |
| F13 | Quiz / exam attempt | 24 | STU (proposed) | Placeholder |
| F14 | Progress & teaching analytics | 13,40 | STU progress · LEC/STA oversight | Partial / Gap |
| F15 | QA, copyright, orientation | 43,42,32 | STA Teaching / Oversight | Gap |

Detailed steps and sequences: human HTML page (each step has a Mermaid sequence with **location** and **you are here**).

## Rules

- Absorb Moodle/Classroom **capability**, not chrome.
- Do not invent Live endpoints; mark Gap / Placeholder honestly.
- CMS remains SoR for enrolment and official published results.
